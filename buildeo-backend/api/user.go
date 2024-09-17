package api

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/Oppir07/BuildDEO-APP/util"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type createUserRequest struct {
	Email      string `json:"email" binding:"required"`
	Password   string `json:"password" binding:"required,min=6"`
	Firstname  string `json:"firstname" binding:"required"`
	Lastname   string `json:"lastname" binding:"required"`
	PostNumber string `json:"post_number" binding:"required"`
	Street     string `json:"street" binding:"required"`
	Phone      string `json:"phone" binding:"required"`
	Role       string `json:"role" binding:"required,oneof=buyer seller admin"`
	CreatedBy  int64  `json:"created_by" binding:"required"`
	UpdatedBy  int64  `json:"updated_by" binding:"required"`
}

type userResponse struct {
	ID         int64     `json:"id" binding:"required"`
	Email      string    `json:"email" binding:"required"`
	Firstname  string    `json:"firstname" binding:"required"`
	Lastname   string    `json:"lastname" binding:"required"`
	PostNumber string    `json:"post_number" binding:"required"`
	Street     string    `json:"street" binding:"required"`
	Phone      string    `json:"phone" binding:"required"`
	Role       string    `json:"role" binding:"required,oneof=buyer seller admin"`
	UpdatedAt  time.Time `json:"updated_at"`
}

func newUserResponse(user db.User) userResponse {
	return userResponse{
		ID:         user.ID,
		Email:      user.Email,
		Firstname:  user.Firstname,
		Lastname:   user.Lastname,
		PostNumber: user.PostNumber,
		Street:     user.Street,
		Phone:      user.Phone,
		Role:       user.Role,
		UpdatedAt:  user.UpdatedAt,
	}
}

func (server *Server) createUser(ctx *gin.Context) {
	var req createUserRequest
	if err := ctx.ShouldBindBodyWithJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	hashedPassword, err := util.HashPassword(req.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	arg := db.CreateUserParams{
		Email:      req.Email,
		Password:   hashedPassword,
		Firstname:  req.Firstname,
		Lastname:   req.Lastname,
		PostNumber: req.PostNumber,
		Street:     req.Street,
		Phone:      req.Phone,
		Role:       req.Role,
		CreatedBy:  req.CreatedBy,
		UpdatedBy:  req.UpdatedBy,
	}

	result, err := server.store.CreateUser(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Fetch the created user by ID
	user, err := server.store.GetUserByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newUserResponse(user)

	ctx.JSON(http.StatusOK, rsp)
}

type getAccountRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

func (server *Server) getUser(ctx *gin.Context) {
	var req getAccountRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	user, err := server.store.GetUserByID(ctx, req.ID)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return

	}

	rsp := newUserResponse(user)

	//authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	ctx.JSON(http.StatusOK, rsp)
}


func (server *Server) listUser(ctx *gin.Context) {

	users, err := server.store.ListUsers(ctx)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return

	}

	ctx.JSON(http.StatusOK, users)
}

type updateUserRequest struct {
	Email     string `json:"email" binding:"omitempty,email"`
	Password  string `json:"password,omitempty"`
	Firstname      string `json:"firstname,omitempty"`
	Lastname      string `json:"lastname,omitempty"`
	PostNumber      string `json:"post_number,omitempty"`
	Street      string `json:"street,omitempty"`
	Phone     string `json:"phone,omitempty"`
	Role      string `json:"role,omitempty" binding:"omitempty,oneof=buyer seller admin"`
	UpdatedBy int64  `json:"updated_by"`
}

func (server *Server) updateUser(ctx *gin.Context) {
	// Extract the ID from the URL parameter
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// Fetch the existing user record
	existingUser, err := server.store.GetUserByID(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Bind the JSON body to the request struct
	var req updateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	hashedPassword, err := util.HashPassword(req.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Merge the existing data with the request data
	arg := db.UpdateUserParams{
		ID:         id,
		Email:      req.Email,
		Password:   hashedPassword,
		Firstname:  req.Firstname,
		Lastname:   req.Lastname,
		PostNumber: req.PostNumber,
		Street:     req.Street,
		Phone:      req.Phone,
		Role:       req.Role,
		UpdatedBy:  req.UpdatedBy,
	}

	// Use existing values if not provided in the request
	if arg.Email == "" {
		arg.Email = existingUser.Email
	}
	if arg.Password == "" {
		arg.Password = existingUser.Password
	}
	if arg.Firstname == "" {
		arg.Firstname = existingUser.Firstname
	}
	if arg.Lastname == "" {
		arg.Lastname = existingUser.Lastname
	}
	if arg.PostNumber == "" {
		arg.PostNumber = existingUser.PostNumber
	}
	if arg.Street == "" {
		arg.Street = existingUser.Street
	}
	if arg.Phone == "" {
		arg.Phone = existingUser.Phone
	}
	if arg.Role == "" {
		arg.Role = existingUser.Role
	}
	if arg.UpdatedBy == 0 {
		arg.UpdatedBy = existingUser.UpdatedBy
	}

	// Execute the update query
	_, err = server.store.UpdateUser(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Fetch the updated user to return in the response
	updatedUser, err := server.store.GetUserByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, updatedUser)
}

type deleteUserRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

func (server *Server) deleteUser(ctx *gin.Context) {
	var req deleteUserRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	err := server.store.DeleteUser(ctx, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "user deleted successfully"})
}

type loginUserRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required,min=6"`
}

type loginUserResponse struct {
	SessionID             uuid.UUID    `json:"session_id"`
	AccessToken           string       `json:"access_token"`
	AccessTokenExpiresAt  time.Time    `json:"access_token_expires_at"`
	RefreshToken          string       `json:"refresh_token"`
	RefreshTokenExpiresAt time.Time    `json:"refresh_token_expires_at"`
	User                  userResponse `json:"user"`
}

func (server *Server) loginUser(ctx *gin.Context) {
	var req loginUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	user, err := server.store.GetUser(ctx, req.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	err = util.CheckPassword(req.Password, user.Password)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	accessToken, accessPayload, err := server.tokenMaker.CreateToken(
		user.Email,
		server.config.AccessTokenDuration,
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	refreshToken, refreshPayload, err := server.tokenMaker.CreateToken(
		user.Email,
		server.config.RefreshTokenDuration,
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := loginUserResponse{
		AccessToken:           accessToken,
		AccessTokenExpiresAt:  accessPayload.ExpiredAt,
		RefreshToken:          refreshToken,
		RefreshTokenExpiresAt: refreshPayload.ExpiredAt,
		User:                  newUserResponse(user),
	}
	ctx.JSON(http.StatusOK, rsp)
}
