package db

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/Oppir07/BuildDEO-APP/util"
	"github.com/stretchr/testify/require"
)

func createRandomQuotation(t *testing.T) Quotation {
	arg := CreateQuotationParams{
		CategoryID:  1,
		Name:        "John Doe",
		Email:       util.RandomEmail(),
		Phone:       "08123456789",
		Address:     "123 Example St.",
		DocumentUrl: "http://example.com/document.pdf",
		Status:      "pending",
		AdminID:     sql.NullInt64{Int64: 1, Valid: true},
		AdminNotes:  sql.NullString{String: "Initial Quotation", Valid: true},
		CreatedBy:   1,
		UpdatedBy:   1,
	}

	result, err := testQueries.CreateQuotation(context.Background(), arg)
	require.NoError(t, err)

	id, err := result.LastInsertId()
	require.NoError(t, err)

	return Quotation{
		ID:          id,
		CategoryID:  arg.CategoryID,
		Name:        arg.Name,
		Email:       arg.Email,
		Phone:       arg.Phone,
		Address:     arg.Address,
		DocumentUrl: arg.DocumentUrl,
		Status:      arg.Status,
		AdminID:     arg.AdminID,
		AdminNotes:  arg.AdminNotes,
		CreatedAt:   time.Now(), // Assume the current time is when the record was created
		CreatedBy:   arg.CreatedBy,
		UpdatedAt:   time.Now(),
		UpdatedBy:   arg.UpdatedBy,
	}
}

func TestCreateQuotation(t *testing.T) {
	quotation := createRandomQuotation(t)

	dbQuotation, err := testQueries.GetQuotation(context.Background(), quotation.ID)
	require.NoError(t, err)
	require.Equal(t, quotation.ID, dbQuotation.ID)
	require.Equal(t, quotation.CategoryID, dbQuotation.CategoryID)
	require.Equal(t, quotation.Name, dbQuotation.Name)
	require.Equal(t, quotation.Email, dbQuotation.Email)
	require.Equal(t, quotation.Phone, dbQuotation.Phone)
	require.Equal(t, quotation.Address, dbQuotation.Address)
	require.Equal(t, quotation.DocumentUrl, dbQuotation.DocumentUrl)
	require.Equal(t, quotation.Status, dbQuotation.Status)
	require.Equal(t, quotation.AdminID, dbQuotation.AdminID)
	require.Equal(t, quotation.AdminNotes, dbQuotation.AdminNotes)
}

func TestGetQuotation(t *testing.T) {
	quotation := createRandomQuotation(t)

	dbQuotation, err := testQueries.GetQuotation(context.Background(), quotation.ID)
	require.NoError(t, err)
	require.Equal(t, quotation.ID, dbQuotation.ID)
	require.Equal(t, quotation.CategoryID, dbQuotation.CategoryID)
	require.Equal(t, quotation.Name, dbQuotation.Name)
	require.Equal(t, quotation.Email, dbQuotation.Email)
	require.Equal(t, quotation.Phone, dbQuotation.Phone)
	require.Equal(t, quotation.Address, dbQuotation.Address)
	require.Equal(t, quotation.DocumentUrl, dbQuotation.DocumentUrl)
	require.Equal(t, quotation.Status, dbQuotation.Status)
	require.Equal(t, quotation.AdminID, dbQuotation.AdminID)
	require.Equal(t, quotation.AdminNotes, dbQuotation.AdminNotes)
}

func TestUpdateQuotation(t *testing.T) {
	quotation := createRandomQuotation(t)

	arg := UpdateQuotationParams{
		ID:          quotation.ID,
		CategoryID:  2, // Assume there's a valid category ID 2
		Name:        "Updated Name",
		Email:       "updated@example.com",
		Phone:       "08129876543",
		Address:     "456 Updated St.",
		DocumentUrl: "http://example.com/updated_document.pdf",
		Status:      "approved",
		AdminID:     sql.NullInt64{Int64: 2, Valid: true},
		AdminNotes:  sql.NullString{String: "Updated Notes", Valid: true},
		UpdatedBy:   2,
	}

	_, err := testQueries.UpdateQuotation(context.Background(), arg)
	require.NoError(t, err)

	updatedQuotation, err := testQueries.GetQuotation(context.Background(), quotation.ID)
	require.NoError(t, err)
	require.Equal(t, arg.Name, updatedQuotation.Name)
	require.Equal(t, arg.Email, updatedQuotation.Email)
	require.Equal(t, arg.Phone, updatedQuotation.Phone)
	require.Equal(t, arg.Address, updatedQuotation.Address)
	require.Equal(t, arg.DocumentUrl, updatedQuotation.DocumentUrl)
	require.Equal(t, arg.Status, updatedQuotation.Status)
	require.Equal(t, arg.AdminID, updatedQuotation.AdminID)
	require.Equal(t, arg.AdminNotes, updatedQuotation.AdminNotes)
}

func TestDeleteQuotation(t *testing.T) {
	quotation := createRandomQuotation(t)

	err := testQueries.DeleteQuotation(context.Background(), quotation.ID)
	require.NoError(t, err)

	_, err = testQueries.GetQuotation(context.Background(), quotation.ID)
	require.Error(t, err)
	require.Equal(t, sql.ErrNoRows, err)
}

func TestListQuotations(t *testing.T) {
	var lastQuotation Quotation
	for i := 0; i < 10; i++ {
		lastQuotation = createRandomQuotation(t)
	}

	AdminID := lastQuotation.AdminID
	

	quotations, err := testQueries.ListQuotations(context.Background(), AdminID)
	require.NoError(t, err)
	require.NotEmpty(t, quotations)

	for _, quotation := range quotations {
		require.NotEmpty(t, quotation)
		require.Equal(t, lastQuotation.AdminID, quotation.AdminID)
	}
}
