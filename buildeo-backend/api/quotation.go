package api

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"time"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/Oppir07/BuildDEO-APP/token"
	"github.com/gin-gonic/gin"
)

// Request and Response Structs

type createQuotationRequest struct {
	CategoryID  int64  `json:"category_id" binding:"required"`
	Name        string `json:"name" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Phone       string `json:"phone" binding:"required"`
	Address     string `json:"address" binding:"required"`
	DocumentUrl string `json:"document_url" binding:"required"`
	Status      string `json:"status" binding:"required"`
	AdminID     int64  `json:"admin_id"`
	AdminNotes  string `json:"admin_notes"`
	CreatedBy   int64  `json:"created_by" binding:"required"`
	UpdatedBy   int64  `json:"updated_by" binding:"required"`
}

type quotationResponse struct {
	ID          int64     `json:"id"`
	CategoryID  int64     `json:"category_id"`
	Name        string    `json:"name"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone"`
	Address     string    `json:"address"`
	DocumentUrl string    `json:"document_url"`
	Status      string    `json:"status"`
	AdminID     int64     `json:"admin_id"`
	AdminNotes  string    `json:"admin_notes"`
	CreatedAt   time.Time `json:"created_at"`
	CreatedBy   int64     `json:"created_by"`
	UpdatedAt   time.Time `json:"updated_at"`
	UpdatedBy   int64     `json:"updated_by"`
}

func newQuotationResponse(quotation db.Quotation) quotationResponse {
	return quotationResponse{
		ID:          quotation.ID,
		CategoryID:  quotation.CategoryID,
		Name:        quotation.Name,
		Email:       quotation.Email,
		Phone:       quotation.Phone,
		Address:     quotation.Address,
		DocumentUrl: quotation.DocumentUrl,
		Status:      quotation.Status,
		AdminID:     quotation.AdminID.Int64,
		AdminNotes:  quotation.AdminNotes.String,
		CreatedAt:   quotation.CreatedAt,
		CreatedBy:   quotation.CreatedBy,
		UpdatedAt:   quotation.UpdatedAt,
		UpdatedBy:   quotation.UpdatedBy,
	}
}

// Create Quotation Handler
func (server *Server) createQuotation(ctx *gin.Context) {
	var req createQuotationRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateQuotationParams{
		CategoryID:  req.CategoryID,
		Name:        req.Name,
		Email:       req.Email,
		Phone:       req.Phone,
		Address:     req.Address,
		DocumentUrl: req.DocumentUrl,
		Status:      req.Status,
		AdminID:     sql.NullInt64{Int64: req.AdminID, Valid: req.AdminID != 0},
		AdminNotes:  sql.NullString{String: req.AdminNotes, Valid: req.AdminNotes != ""},
		CreatedBy:   req.CreatedBy,
		UpdatedBy:   req.UpdatedBy,
	}

	quotation, err := server.store.CreateQuotation(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	id, err := quotation.LastInsertId()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Fetch the created user by ID
	result, err := server.store.GetQuotation(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, newQuotationResponse(result))
}

// Get Quotation by ID Handler
type getQuotationRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

func (server *Server) getQuotation(ctx *gin.Context) {
	var req getQuotationRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	quotation, err := server.store.GetQuotation(ctx, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	user, err := server.store.GetUser(ctx, authPayload.Username)

	if quotation.AdminID.Int64 != user.ID {
		ctx.JSON(http.StatusForbidden, errorResponse(fmt.Errorf("not authorized to access this resource")))
		return
	}

	ctx.JSON(http.StatusOK, newQuotationResponse(quotation))
}



func (server *Server) listQuotations(ctx *gin.Context) {
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	// Fetch the authenticated user
	user, err := server.store.GetUser(ctx, authPayload.Username)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Construct AdminID if applicable
	AdminID := sql.NullInt64{
		Int64: user.ID, // Assign the user ID
		Valid: true,    // Indicate that this is a valid ID
	}

	
	// Fetch quotations based on the parameters
	quotations, err := server.store.ListQuotations(ctx, AdminID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Return the list of quotations
	ctx.JSON(http.StatusOK, quotations)
}


// Update Quotation Handler
type updateQuotationRequest struct {
	CategoryID  int64  `json:"category_id" binding:"omitempty"`
	Name        string `json:"name" binding:"omitempty"`
	Email       string `json:"email" binding:"omitempty,email"`
	Phone       string `json:"phone" binding:"omitempty"`
	Address     string `json:"address" binding:"omitempty"`
	DocumentUrl string `json:"document_url" binding:"omitempty"`
	Status      string `json:"status" binding:"omitempty"`
	AdminID     int64  `json:"admin_id"`
	AdminNotes  string `json:"admin_notes"`
	UpdatedBy   int64  `json:"updated_by" binding:"required"`
}

func (server *Server) updateQuotation(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	existingQuotation, err := server.store.GetQuotation(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var req updateQuotationRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.UpdateQuotationParams{
		ID:          id,
		CategoryID:  req.CategoryID,
		Name:        req.Name,
		Email:       req.Email,
		Phone:       req.Phone,
		Address:     req.Address,
		DocumentUrl: req.DocumentUrl,
		Status:      req.Status,
		AdminID:     sql.NullInt64{Int64: req.AdminID, Valid: req.AdminID != 0},
		AdminNotes:  sql.NullString{String: req.AdminNotes, Valid: req.AdminNotes != ""},
		UpdatedBy:   req.UpdatedBy,
	}

	if arg.CategoryID == 0 {
		arg.CategoryID = existingQuotation.CategoryID
	}
	if arg.Name == "" {
		arg.Name = existingQuotation.Name
	}
	if arg.Email == "" {
		arg.Email = existingQuotation.Email
	}
	if arg.Phone == "" {
		arg.Phone = existingQuotation.Phone
	}
	if arg.Address == "" {
		arg.Address = existingQuotation.Address
	}
	if arg.DocumentUrl == "" {
		arg.DocumentUrl = existingQuotation.DocumentUrl
	}
	if arg.Status == "" {
		arg.Status = existingQuotation.Status
	}
	if !arg.AdminID.Valid {
		arg.AdminID = existingQuotation.AdminID
	}
	if !arg.AdminNotes.Valid {
		arg.AdminNotes = existingQuotation.AdminNotes
	}

	_, err = server.store.UpdateQuotation(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	updatedQuotation, err := server.store.GetQuotation(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, newQuotationResponse(updatedQuotation))
}

// Delete Quotation Handler
type deleteQuotationRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

func (server *Server) deleteQuotation(ctx *gin.Context) {
	var req deleteQuotationRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	err := server.store.DeleteQuotation(ctx, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "quotation deleted successfully"})
}
