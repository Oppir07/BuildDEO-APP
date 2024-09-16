package db

import (
	"context"
	"database/sql"
	"testing"
	"time"
	
	"github.com/Oppir07/BuildDEO-APP/util"
	"github.com/stretchr/testify/require"
)

func createRandomUser(t *testing.T) User {
	hashedPassword, err := util.HashPassword("123456")
	require.NoError(t,err)

	arg := CreateUserParams{
		Email:     util.RandomEmail(),
		Password:  hashedPassword,
		Firstname:      "Tom",
		Lastname:      "Haye",
		PostNumber:      "22381",
		Street:      "Hauptstrasse 24",
		Phone:     "08123456789",
		Role:      "buyer",
		CreatedBy: 1,
		UpdatedBy: 1,
	}

	result, err := testQueries.CreateUser(context.Background(), arg)
	require.NoError(t, err)

	id, err := result.LastInsertId()
	require.NoError(t, err)

	return User{
		ID:        id,
		Email:     arg.Email,
		Password:  arg.Password,
		Firstname:      arg.Firstname,
		Lastname:      arg.Lastname,
		PostNumber:      arg.PostNumber,
		Street:      arg.Street,
		Phone:     arg.Phone,
		Role:      arg.Role,
		CreatedAt: time.Now(), 
		CreatedBy: arg.CreatedBy,
		UpdatedAt: time.Now(), 
		UpdatedBy: arg.UpdatedBy,
	}
}

func TestCreateUser(t *testing.T) {
	user := createRandomUser(t)

	// Verify user exists in the database
	dbUser, err := testQueries.GetUserByID(context.Background(), user.ID)
	require.NoError(t, err)
	require.Equal(t, user.ID, dbUser.ID)
	require.Equal(t, user.Email, dbUser.Email)
	require.Equal(t, user.Password, dbUser.Password)
	require.Equal(t, user.Firstname, dbUser.Firstname)
	require.Equal(t, user.Lastname, dbUser.Lastname)
	require.Equal(t, user.PostNumber, dbUser.PostNumber)
	require.Equal(t, user.Street, dbUser.Street)
	require.Equal(t, user.Phone, dbUser.Phone)
	require.Equal(t, user.Role, dbUser.Role)
	// require.WithinDuration(t, user.CreatedAt, dbUser.CreatedAt, 5*time.Hour+time.Millisecond) // need to set global timezone 
	// require.WithinDuration(t, user.UpdatedAt, dbUser.UpdatedAt, 5*time.Hour+time.Millisecond)
}

func TestGetUser(t *testing.T) {
	// Create a new user first
	user := createRandomUser(t)

	retrievedUser, err := testQueries.GetUserByID(context.Background(), user.ID)
	require.NoError(t, err)
	require.Equal(t, user.ID, retrievedUser.ID)
	require.Equal(t, user.Email, retrievedUser.Email)
	require.Equal(t, user.Firstname, retrievedUser.Firstname)
	require.Equal(t, user.Lastname, retrievedUser.Lastname)
	require.Equal(t, user.PostNumber, retrievedUser.PostNumber)
	require.Equal(t, user.Street, retrievedUser.Street)
	require.Equal(t, user.Phone, retrievedUser.Phone)
	require.Equal(t, user.Role, retrievedUser.Role)
	// require.WithinDuration(t, user.CreatedAt, retrievedUser.CreatedAt, 5*time.Hour+time.Millisecond) // need to set global timezone 
}

func TestUpdateUser(t *testing.T) {
	user := createRandomUser(t)

	arg := UpdateUserParams{
		ID:   user.ID,
		Firstname: "Updated Name",
		Email:     user.Email,
		Password:  user.Password,
		Lastname:      user.Lastname,
		PostNumber:      user.PostNumber,
		Street:      user.Street,
		Phone:     user.Phone,
		Role:      user.Role,
		UpdatedBy: user.UpdatedBy,
	}

	_, err := testQueries.UpdateUser(context.Background(), arg)
	require.NoError(t, err)

	// Verify the user is updated
	updatedUser, err := testQueries.GetUserByID(context.Background(), user.ID)
	require.NoError(t, err)
	require.Equal(t, arg.Firstname, updatedUser.Firstname)
}

func TestDeleteUser(t *testing.T) {
	user := createRandomUser(t)

	err := testQueries.DeleteUser(context.Background(), user.ID)
	require.NoError(t, err)

	// Verify user is deleted
	_, err = testQueries.GetUserByID(context.Background(), user.ID)
	require.Error(t, err)
	require.Equal(t, sql.ErrNoRows, err)
}

func TestListUsers(t *testing.T) {
	// Create some users
	for i := 0; i < 10; i++ {
		createRandomUser(t)
	}

	users, err := testQueries.ListUsers(context.Background())
	require.NoError(t, err)
	require.Len(t, users, 5)

	for _, user := range users {
		require.NotEmpty(t, user)
	}
}
