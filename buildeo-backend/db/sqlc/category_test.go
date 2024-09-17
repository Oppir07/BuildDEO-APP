package db

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
)

func createRandomCategory(t *testing.T) Category {
	arg := CreateCategoryParams{
		Name:        "Electronics",
		Description: sql.NullString{String: "Category for electronic items", Valid: true},
		CreatedBy:   1,
		UpdatedBy:   1,
	}

	result, err := testQueries.CreateCategory(context.Background(), arg)
	require.NoError(t, err)

	id, err := result.LastInsertId()
	require.NoError(t, err)

	return Category{
		ID:          id,
		Name:        arg.Name,
		Description: arg.Description,
		CreatedAt:   time.Now(),
		CreatedBy:   arg.CreatedBy,
		UpdatedAt:   time.Now(),
		UpdatedBy:   arg.UpdatedBy,
	}
}

func TestCreateCategory(t *testing.T) {
	category := createRandomCategory(t)

	dbCategory, err := testQueries.GetCategory(context.Background(), category.ID)
	require.NoError(t, err)
	require.Equal(t, category.ID, dbCategory.ID)
	require.Equal(t, category.Name, dbCategory.Name)
	require.Equal(t, category.Description, dbCategory.Description)
}

func TestGetCategory(t *testing.T) {
	category := createRandomCategory(t)

	dbCategory, err := testQueries.GetCategory(context.Background(), category.ID)
	require.NoError(t, err)
	require.Equal(t, category.ID, dbCategory.ID)
	require.Equal(t, category.Name, dbCategory.Name)
	require.Equal(t, category.Description, dbCategory.Description)
}

func TestUpdateCategory(t *testing.T) {
	category := createRandomCategory(t)

	arg := UpdateCategoryParams{
		ID:          category.ID,
		Name:        "Updated Category",
		Description: sql.NullString{String: "Updated category description", Valid: true},
		UpdatedBy:   2,
	}

	_, err := testQueries.UpdateCategory(context.Background(), arg)
	require.NoError(t, err)

	updatedCategory, err := testQueries.GetCategory(context.Background(), category.ID)
	require.NoError(t, err)
	require.Equal(t, arg.Name, updatedCategory.Name)
	require.Equal(t, arg.Description, updatedCategory.Description)
}

func TestDeleteCategory(t *testing.T) {
	category := createRandomCategory(t)

	err := testQueries.DeleteCategory(context.Background(), category.ID)
	require.NoError(t, err)

	_, err = testQueries.GetCategory(context.Background(), category.ID)
	require.Error(t, err)
	require.Equal(t, sql.ErrNoRows, err)
}

func TestListCategories(t *testing.T) {
	for i := 0; i < 10; i++ {
		createRandomCategory(t)
	}

	categories, err := testQueries.ListCategory(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, categories)

	for _, category := range categories {
		require.NotEmpty(t, category)
	}
}
