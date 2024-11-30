package api

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"time"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/gin-gonic/gin"
)

// createServicePhotoRequest is the structure for the request payload
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

// CreateServicePhoto handles the creation of a new service photo
func (h *Server) createServicePhoto(ctx *gin.Context) {
	serviceID, err := strconv.ParseInt(ctx.PostForm("service_id"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	createdBy, err := strconv.ParseInt(ctx.PostForm("created_by"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	updatedBy, err := strconv.ParseInt(ctx.PostForm("updated_by"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	photoURL, err := uploadFile(ctx, photoDir, "photo")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	arg := db.CreateServicePhotoParams{
		ServiceID: serviceID,
		PhotoUrl:  photoURL,
		CreatedBy: createdBy,
		UpdatedBy: updatedBy,
	}

	photo, err := h.store.CreateServicePhoto(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	photoID, err := photo.LastInsertId()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	result, err := h.store.GetServicePhotoByID(ctx, photoID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServicePhotoResponse(result)
	ctx.JSON(http.StatusOK, rsp)
}

// DeleteServicePhoto handles deletion of a service photo and the associated file
func (h *Server) deleteServicePhoto(ctx *gin.Context) {
	id, err := strconv.ParseInt(ctx.Param("id"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	photo, err := h.store.GetServicePhotosByServiceID(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(fmt.Errorf("photo not found")))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	photoURL := photo.PhotoUrl
	if err := deleteUploadedFile(photoURL); err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	if err := h.store.DeleteServicePhoto(ctx, id); err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "service photo deleted successfully"})
}

// GetServicePhoto retrieves a single service photo by ID.
func (h *Server) getServicePhoto(ctx *gin.Context) {
	id, err := strconv.ParseInt(ctx.Param("id"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	photo, err := h.store.GetServicePhotosByServiceID(ctx, id)
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

// ListServicePhotos retrieves all service photos.
func (h *Server) listServicePhotos(ctx *gin.Context) {
	photos, err := h.store.ListServicePhotos(ctx)
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

// UpdateServicePhoto updates an existing service photo.
func (h *Server) updateServicePhoto(ctx *gin.Context) {
	id, err := strconv.ParseInt(ctx.Param("id"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	updatedBy, err := strconv.ParseInt(ctx.PostForm("updated_by"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	file, _, err := ctx.Request.FormFile("photo")
	if err != nil && err != http.ErrMissingFile {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	var photoURL string
	if file != nil {
		photoURL, err = uploadFile(ctx, photoDir, "photo")
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}
	} else {
		existingPhoto, err := h.store.GetServicePhotoByID(ctx, id)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}
		photoURL = existingPhoto.PhotoUrl
	}

	arg := db.UpdateServicePhotoParams{
		PhotoUrl:  photoURL,
		UpdatedBy: updatedBy,
		ServiceID: id,
	}

	_, err = h.store.UpdateServicePhoto(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	updatedPhoto, err := h.store.GetServicePhotosByServiceID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServicePhotoResponse(updatedPhoto)
	ctx.JSON(http.StatusOK, rsp)
}
