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
	arg := CreateUserParams{
		Email:     util.RandomName(),
		Password:  "123456",
		Name:      "Tom",
		Phone:     "08123456789",
		Role:      "buyer",
		CreatedBy: 1, // Assuming user with ID 1 is creating this user
		UpdatedBy: 1, // Assuming the same user is updating
	}

	user, err := testQueries.CreateUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, user)

	require.Equal(t, arg.Email, user.Email)
	require.Equal(t, arg.Password, user.Password)
	require.Equal(t, arg.Name, user.Name)
	require.Equal(t, arg.Phone, user.Phone)
	require.Equal(t, arg.Role, user.Role)
	require.Equal(t, arg.CreatedBy, user.CreatedBy)
	require.Equal(t, arg.UpdatedBy, user.UpdatedBy)

	require.NotZero(t, user.ID)
	require.NotZero(t, user.CreatedAt)
	require.NotZero(t, user.UpdatedAt)

	return user
}

func TestCreateUser(t *testing.T) {
	createRandomUser(t)
}

func TestGetUser(t *testing.T) {
	// Create a new user first
	user1 := createRandomUser(t)
	user2, err := testQueries.GetUser(context.Background(), user1.ID)

	require.NoError(t, err)
	require.NotEmpty(t, user2)

	require.Equal(t, user1.ID, user2.ID)
	require.Equal(t, user1.Email, user2.Email)
	require.Equal(t, user1.Name, user2.Name)
	require.Equal(t, user1.Phone, user2.Phone)
	require.Equal(t, user1.Role, user2.Role)
	require.WithinDuration(t, user1.CreatedAt, user2.CreatedAt, time.Second)
}

func TestUpdateUser(t *testing.T) {
	user1 := createRandomUser(t)

	arg := UpdateUserParams{
		ID:   user1.ID,
		Name: util.RandomName(),
	}

	user2, err := testQueries.UpdateUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, user2)

	require.Equal(t, user1.ID, user2.ID)
	require.Equal(t, user1.Email, user2.Email)
	require.Equal(t, arg.Name, user2.Name)
	require.Equal(t, user1.Phone, user2.Phone)
	require.Equal(t, user1.Role, user2.Role)
	require.WithinDuration(t, user1.CreatedAt, user2.CreatedAt, time.Second)
}

func TestDeleteUser(t *testing.T) {
	user1 := createRandomUser(t)
	err := testQueries.DeleteUser(context.Background(), user1.ID)

	require.NoError(t, err)
	user2, err := testQueries.GetUser(context.Background(), user1.ID)

	require.Error(t, err)
	require.EqualError(t, err, sql.ErrNoRows.Error())

	require.Empty(t, user2)
}

func TestListUser(t *testing.T) {
	for i := 0; i < 10; i++ {
		createRandomUser(t)
	}

	arg := ListUsersParams{
		Limit:  5,
		Offset: 5,
	}

	users, err := testQueries.ListUsers(context.Background(), arg)
	require.NoError(t, err)
	require.Len(t, users, 5)

	for _, user := range users {
		require.NotEmpty(t, user)
	}
}