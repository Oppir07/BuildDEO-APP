package api

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/gin-gonic/gin"
)

// Request structure for creating a service photo
type createServicePhotoRequest struct {
	ServiceID int64  `json:"service_id" binding:"required"`
	PhotoUrl  string `json:"photo_url" binding:"required"`
	CreatedBy int64  `json:"created_by" binding:"required"`
	UpdatedBy int64  `json:"updated_by" binding:"required"`
}

// Response structure for service photo details
type servicePhotoResponse struct {
	ID        int64     `json:"id"`
	ServiceID int64     `json:"service_id"`
	PhotoUrl  string    `json:"photo_url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Helper function to convert db.ServicePhoto to servicePhotoResponse
func newServicePhotoResponse(photo db.ServicePhoto) servicePhotoResponse {
	return servicePhotoResponse{
		ID:        photo.ID,
		ServiceID: photo.ServiceID,
		PhotoUrl:  photo.PhotoUrl,
		CreatedAt: photo.CreatedAt,
		UpdatedAt: photo.UpdatedAt,
	}
}

// Create a new service photo
func (server *Server) createServicePhoto(ctx *gin.Context) {
	var req createServicePhotoRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateServicePhotoParams{
		ServiceID: req.ServiceID,
		PhotoUrl:  req.PhotoUrl,
		CreatedBy: req.CreatedBy,
		UpdatedBy: req.UpdatedBy,
	}

	photo, err := server.store.CreateServicePhoto(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	photoID, err := photo.LastInsertId()

	result, err := server.store.GetServicePhotoByID(ctx, photoID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServicePhotoResponse(result)

	ctx.JSON(http.StatusOK, rsp)
}

// Get a service photo by ID
func (server *Server) getServicePhoto(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	photo, err := server.store.GetServicePhotoByID(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServicePhotoResponse(photo)
	ctx.JSON(http.StatusOK, rsp)
}


func (server *Server) listServicePhotos(ctx *gin.Context) {
	
	photos, err := server.store.ListServicePhotos(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var rsp []servicePhotoResponse
	for _, photo := range photos {
		rsp = append(rsp, newServicePhotoResponse(photo))
	}

	ctx.JSON(http.StatusOK, rsp)
}

// Update a service photo
type updateServicePhotoRequest struct {
	ServiceID int64  `json:"service_id,omitempty"`
	PhotoUrl  string `json:"photo_url,omitempty"`
	UpdatedBy int64  `json:"updated_by" binding:"required"`
}

func (server *Server) updateServicePhoto(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	var req updateServicePhotoRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.UpdateServicePhotoParams{
		ID:        id,
		ServiceID: req.ServiceID,
		PhotoUrl:  req.PhotoUrl,
		UpdatedBy: req.UpdatedBy,
	}

	_, err = server.store.UpdateServicePhoto(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	updatedPhoto, err := server.store.GetServicePhotoByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServicePhotoResponse(updatedPhoto)
	ctx.JSON(http.StatusOK, rsp)
}

// Delete a service photo
func (server *Server) deleteServicePhoto(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	err = server.store.DeleteServicePhoto(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "service photo deleted successfully"})
}
