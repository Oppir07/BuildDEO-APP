package db

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
)

func createRandomQuotation(t *testing.T) Quotation {
	arg := CreateQuotationParams{
		CategoryID:  sql.NullInt64{Int64: 1, Valid: true},
		DocumentUrl: sql.NullString{String: "http://example.com/document.pdf", Valid: true},
		Status:      "pending",
		UserID:      sql.NullInt64{Int64: 1, Valid: true},
		Description: sql.NullString{String: "open", Valid: true},
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
		DocumentUrl: arg.DocumentUrl,
		Status:      arg.Status,
		UserID:      arg.UserID,
		Description: arg.Description,
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
	require.Equal(t, quotation.DocumentUrl, dbQuotation.DocumentUrl)
	require.Equal(t, quotation.Status, dbQuotation.Status)
	require.Equal(t, quotation.UserID, dbQuotation.UserID)
	require.Equal(t, quotation.Description, dbQuotation.Description)
}

func TestGetQuotation(t *testing.T) {
	quotation := createRandomQuotation(t)

	dbQuotation, err := testQueries.GetQuotation(context.Background(), quotation.ID)
	require.NoError(t, err)
	require.Equal(t, quotation.ID, dbQuotation.ID)
	require.Equal(t, quotation.CategoryID, dbQuotation.CategoryID)
	require.Equal(t, quotation.DocumentUrl, dbQuotation.DocumentUrl)
	require.Equal(t, quotation.Status, dbQuotation.Status)
	require.Equal(t, quotation.UserID, dbQuotation.UserID)
	require.Equal(t, quotation.Description, dbQuotation.Description)
}

func TestUpdateQuotation(t *testing.T) {
	quotation := createRandomQuotation(t)

	arg := UpdateQuotationParams{
		ID:          quotation.ID,
		CategoryID:  sql.NullInt64{Int64: 2, Valid: true},
		DocumentUrl: sql.NullString{String: "http://example.com/updateddocument.pdf", Valid: true},
		Status:      "approved",
		Description: sql.NullString{String: "Updated Notes", Valid: true},
		UpdatedBy:   2,
	}

	_, err := testQueries.UpdateQuotation(context.Background(), arg)
	require.NoError(t, err)

	updatedQuotation, err := testQueries.GetQuotation(context.Background(), quotation.ID)
	require.NoError(t, err)
	require.Equal(t, arg.DocumentUrl, updatedQuotation.DocumentUrl)
	require.Equal(t, arg.Status, updatedQuotation.Status)
	require.Equal(t, arg.Description, updatedQuotation.Description)
}

func TestDeleteQuotation(t *testing.T) {
	quotation := createRandomQuotation(t)

	err := testQueries.DeleteQuotation(context.Background(), quotation.ID)
	require.NoError(t, err)

	_, err = testQueries.GetQuotation(context.Background(), quotation.ID)
	require.Error(t, err)
	require.Equal(t, sql.ErrNoRows, err)
}

// func TestListQuotations(t *testing.T) {
// 	var lastQuotation Quotation
// 	for i := 0; i < 10; i++ {
// 		lastQuotation = createRandomQuotation(t)
// 	}

// 	AdminID := lastQuotation.AdminID

// 	quotations, err := testQueries.ListQuotations(context.Background(), AdminID)
// 	require.NoError(t, err)
// 	require.NotEmpty(t, quotations)

// 	for _, quotation := range quotations {
// 		require.NotEmpty(t, quotation)
// 		require.Equal(t, lastQuotation.AdminID, quotation.AdminID)
// 	}
// }
