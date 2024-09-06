package api

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/gin-gonic/gin"
)

// Request structure for creating a service
type createServiceRequest struct {
	SellerID    int64  `json:"seller_id" binding:"required"`
	CategoryID  int64  `json:"category_id" binding:"required"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	Price       int64  `json:"price" binding:"required"`
	CreatedBy   int64  `json:"created_by" binding:"required"`
	UpdatedBy   int64  `json:"updated_by" binding:"required"`
}

// Response structure for service details
type serviceResponse struct {
	ID          int64     `json:"id"`
	SellerID    int64     `json:"seller_id"`
	CategoryID  int64     `json:"category_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Price       int64     `json:"price"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Helper function to convert db.Service to serviceResponse
func newServiceResponse(service db.Service) serviceResponse {
	return serviceResponse{
		ID:          service.ID,
		SellerID:    service.SellerID,
		CategoryID:  service.CategoryID,
		Title:       service.Title,
		Description: service.Description.String,
		Price:       service.Price,
		CreatedAt:   service.CreatedAt,
		UpdatedAt:   service.UpdatedAt,
	}
}

// Create a new service
func (server *Server) createService(ctx *gin.Context) {
	var req createServiceRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateServiceParams{
		SellerID:    req.SellerID,
		CategoryID:  req.CategoryID,
		Title:       req.Title,
		Description: sql.NullString{String: req.Description, Valid: req.Description != ""},
		Price:       req.Price,
		CreatedBy:   req.CreatedBy,
		UpdatedBy:   req.UpdatedBy,
	}

	service, err := server.store.CreateService(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	serviceID, err := service.LastInsertId()

	result, err := server.store.GetServiceByID(ctx, serviceID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServiceResponse(result)
	ctx.JSON(http.StatusOK, rsp)
}

// Get a service by ID
func (server *Server) getService(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	service, err := server.store.GetServiceByID(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServiceResponse(service)
	ctx.JSON(http.StatusOK, rsp)
}

// Update a service
type updateServiceRequest struct {
	Title       string `json:"title,omitempty"`
	SellerID    int64  `json:"seller_id,omitempty"`
	CategoryID  int64  `json:"category_id,omitempty"`
	Description string `json:"description,omitempty"`
	Price       int64  `json:"price,omitempty"`
	UpdatedBy   int64  `json:"updated_by" binding:"required"`
}

func (server *Server) updateService(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	var req updateServiceRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.UpdateServiceParams{
		ID:          id,
		SellerID:    req.SellerID,
		CategoryID:  req.CategoryID,
		Title:       req.Title,
		Description: sql.NullString{String: req.Description, Valid: true},
		Price:       req.Price,
		UpdatedBy:   req.UpdatedBy,
	}


	_, err = server.store.UpdateService(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	updatedService, err := server.store.GetServiceByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServiceResponse(updatedService)
	ctx.JSON(http.StatusOK, rsp)
}

// Delete a service
func (server *Server) deleteService(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	err = server.store.DeleteService(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "service deleted successfully"})
}

// List services with pagination
type listServiceRequest struct {
	PageID   int32 `form:"page_id" binding:"required,min=1"`
	PageSize int32 `form:"page_size" binding:"required,min=5,max=10"`
}

func (server *Server) listService(ctx *gin.Context) {
	var req listServiceRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.ListServiceParams{
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
	}

	services, err := server.store.ListService(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, services)
}
