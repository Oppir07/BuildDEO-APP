package db

import (
	"context"
	"testing"
	"database/sql"
	"github.com/stretchr/testify/require"
)

// Helper function to create a random service photo
func createRandomServicePhoto(t *testing.T, service GetServiceByIDRow) ServicePhoto {
	// Create a random service photo
	arg := CreateServicePhotoParams{
		ServiceID: service.ID,
		PhotoUrl:  "https://images.unsplash.com/photo-1673865641469-34498379d8af?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Mock URL for photo
		CreatedBy: service.CreatedBy,
		UpdatedBy: service.UpdatedBy,
	}

	result, err := testQueries.CreateServicePhoto(context.Background(), arg)
	require.NoError(t, err)
	require.NotNil(t, result)

	// Get the inserted photo ID
	photoID, err := result.LastInsertId()
	require.NoError(t, err)

	// Fetch and return the created service photo
	servicePhoto, err := testQueries.GetServicePhotoByID(context.Background(), photoID)
	require.NoError(t, err)
	require.NotEmpty(t, servicePhoto)

	return servicePhoto
}

// Test for creating a service photo
func TestCreateServicePhoto(t *testing.T) {
	// First, create a random service
	service := createRandomService(t)

	// Create a service photo
	servicePhoto := createRandomServicePhoto(t, service)

	// Perform assertions on the created service photo
	require.NotEmpty(t, servicePhoto)
	require.NotZero(t, servicePhoto.ID)
	require.Equal(t, service.ID, servicePhoto.ServiceID)
	require.Equal(t, "https://images.unsplash.com/photo-1673865641469-34498379d8af?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", servicePhoto.PhotoUrl)
}

// Test for updating a service photo
func TestUpdateServicePhoto(t *testing.T) {
	// First, create a random service
	service := createRandomService(t)

	// Create a random service photo
	servicePhoto := createRandomServicePhoto(t, service)

	// Update the service photo URL
	arg := UpdateServicePhotoParams{
		ServiceID: servicePhoto.ServiceID,
		PhotoUrl:  "https://plus.unsplash.com/premium_photo-1682882688309-54527c93dc97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		UpdatedBy: service.UpdatedBy,
		ID:        servicePhoto.ID,
	}

	_, err := testQueries.UpdateServicePhoto(context.Background(), arg)
	require.NoError(t, err)

	// Fetch the updated service photo
	updatedServicePhoto, err := testQueries.GetServicePhotoByID(context.Background(), servicePhoto.ID)
	require.NoError(t, err)

	// Perform assertions to verify the update
	require.Equal(t, arg.PhotoUrl, updatedServicePhoto.PhotoUrl)
}

// Test for listing service photos
func TestListServicePhotos(t *testing.T) {
	// Create a random service
	service := createRandomService(t)

	// Create multiple service photos
	for i := 0; i < 3; i++ {
		createRandomServicePhoto(t, service)
	}


	photos, err := testQueries.ListServicePhotos(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, photos)

	// Check that at least one photo exists
	require.True(t, len(photos) > 0)

	// Optionally, check some properties of the first photo in the list
	firstPhoto := photos[0]
	require.NotZero(t, firstPhoto.ID)
	require.Equal(t, service.ID, firstPhoto.ServiceID)
}

// Test for deleting a service photo
func TestDeleteServicePhoto(t *testing.T) {
	// Create a random service
	service := createRandomService(t)

	// Create a service photo
	servicePhoto := createRandomServicePhoto(t, service)

	// Delete the service photo
	err := testQueries.DeleteServicePhoto(context.Background(), servicePhoto.ID)
	require.NoError(t, err)

	// Try to fetch the deleted service photo and expect an error
	_, err = testQueries.GetServicePhotoByID(context.Background(), servicePhoto.ID)
	require.Error(t, err)
	require.EqualError(t, err, sql.ErrNoRows.Error()) // Expect a "no rows" error
}

// Test for getting service photos by service ID
func TestGetServicePhotosByServiceID(t *testing.T) {
	// Create a random service
	service := createRandomService(t)

	// Create multiple service photos for this service
	for i := 0; i < 3; i++ {
		createRandomServicePhoto(t, service)
	}

	// Get service photos by service ID
	photos, err := testQueries.GetServicePhotosByServiceID(context.Background(), service.ID)
	require.NoError(t, err)
	require.NotEmpty(t, photos)

	// Verify that all the photos are associated with the correct service
	for _, photo := range photos {
		require.Equal(t, service.ID, photo.ServiceID)
	}
}
