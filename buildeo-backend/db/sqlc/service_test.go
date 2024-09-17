package db

import (
	"context"
	"database/sql"
	"testing"

	"github.com/Oppir07/BuildDEO-APP/util"
	"github.com/stretchr/testify/require"
)

func createRandomService(t *testing.T) GetServiceByIDRow {
	// Create a random user and category
	user := createRandomUser(t)
	category := createRandomCategory(t)

	// Create a random service
	arg := CreateServiceParams{
		SellerID:    user.ID,
		CategoryID:  category.ID,
		Title:       "Test Service " + util.RandomString(6), // Random title
		Description: sql.NullString{String: "Test Service Description", Valid: true},
		Price:       util.RandomInt(1000, 10000), // Random price
		CreatedBy:   user.ID,
		UpdatedBy:   user.ID,
	}

	result, err := testQueries.CreateService(context.Background(), arg)
	require.NoError(t, err)
	require.NotNil(t, result)

	// Get the inserted service ID
	serviceID, err := result.LastInsertId()
	require.NoError(t, err)

	// Fetch and return the created service for further testing
	service, err := testQueries.GetServiceByID(context.Background(), serviceID)
	require.NoError(t, err)
	require.NotEmpty(t, service)

	return service
}

func TestCreateService(t *testing.T) {
	// Use the helper function to create a random service
	service := createRandomService(t)

	// Perform assertions on the created service
	require.NotEmpty(t, service)
	require.NotZero(t, service.ID)
	require.NotZero(t, service.SellerID)
	require.NotZero(t, service.CategoryID)
	require.NotZero(t, service.Price)

	// Validate some specific fields
	require.Equal(t, service.Title[:12], "Test Service")
	require.Equal(t, service.Description.String, "Test Service Description")
}

func TestUpdateService(t *testing.T) {
	// First, create a random service using the helper
	service := createRandomService(t)

	// Update some fields of the service
	arg := UpdateServiceParams{
		SellerID:    service.SellerID,
		CategoryID:  service.CategoryID,
		Title:       "Updated Test Service",
		Description: sql.NullString{String: "Updated Description", Valid: true},
		Price:       service.Price + 1000, // Increase price
		UpdatedBy:   service.UpdatedBy,
		ID:          service.ID,
	}

	// Update the service
	_, err := testQueries.UpdateService(context.Background(), arg)
	require.NoError(t, err)

	// Fetch the updated service
	updatedService, err := testQueries.GetServiceByID(context.Background(), service.ID)
	require.NoError(t, err)

	// Perform assertions to verify the update
	require.Equal(t, arg.Title, updatedService.Title)
	require.Equal(t, arg.Description.String, updatedService.Description.String)
	require.Equal(t, arg.Price, updatedService.Price)
}

func TestListService(t *testing.T) {
	// Create several random services
	for i := 0; i < 5; i++ {
		createRandomService(t)
	}

	// List all services
	services, err := testQueries.ListService(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, services)

	// Check that at least one service exists
	require.True(t, len(services) > 0)

	// Optionally, check some properties of the first service in the list
	firstService := services[0]
	require.NotZero(t, firstService.ID)
	require.NotZero(t, firstService.SellerID)
	require.NotZero(t, firstService.CategoryID)
	require.NotZero(t, firstService.Price)
}

func TestDeleteService(t *testing.T) {
	// Create a random service
	service := createRandomService(t)

	// Delete the service
	err := testQueries.DeleteService(context.Background(), service.ID)
	require.NoError(t, err)

	// Try to fetch the deleted service and expect an error
	_, err = testQueries.GetServiceByID(context.Background(), service.ID)
	require.Error(t, err)
	require.EqualError(t, err, sql.ErrNoRows.Error()) // Expect a "no rows" error
}

func TestGetServiceBySeller(t *testing.T) {
	// Create a random user (seller)
	user := createRandomUser(t)

	// Create services for this specific seller
	for i := 0; i < 3; i++ {
		arg := CreateServiceParams{
			SellerID:    user.ID,
			CategoryID:  createRandomCategory(t).ID,
			Title:       "Service for Seller",
			Description: sql.NullString{String: "Seller's Service", Valid: true},
			Price:       util.RandomInt(1000, 10000),
			CreatedBy:   user.ID,
			UpdatedBy:   user.ID,
		}
		_, err := testQueries.CreateService(context.Background(), arg)
		require.NoError(t, err)
	}

	// Get all services for this seller
	services, err := testQueries.GetServiceBySeller(context.Background(), user.ID)
	require.NoError(t, err)
	require.NotEmpty(t, services)

	// Verify that all the services are indeed associated with this seller
	for _, service := range services {
		require.Equal(t, user.ID, service.SellerID)
	}
}
