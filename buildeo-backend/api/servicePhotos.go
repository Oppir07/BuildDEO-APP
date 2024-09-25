package api

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"
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
func (server *Server) createServicePhoto(ctx *gin.Context) {
    var req createServicePhotoRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, errorResponse(err))
        return
    }

    // Set the default photo URL if none is provided
    if req.PhotoUrl == "" {
        req.PhotoUrl = "https://images.unsplash.com/photo-1673865641469-34498379d8af?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }

    // Insert the record into the database
    arg := db.CreateServicePhotoParams{
        ServiceID: req.ServiceID,
        PhotoUrl:  req.PhotoUrl, // Use the provided or default photo URL
        CreatedBy: req.CreatedBy,
        UpdatedBy: req.UpdatedBy,
    }

    photo, err := server.store.CreateServicePhoto(ctx, arg)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, errorResponse(err))
        return
    }

    photoID, err := photo.LastInsertId()
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, errorResponse(err))
        return
    }


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

// uploadServicePhoto handles the uploading of a service photo
func (server *Server) uploadServicePhoto(ctx *gin.Context) {
	file, err := ctx.FormFile("image") // Changed to match with the frontend
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// Define the upload directory
	uploadPath := "./uploads/"
	if _, err := os.Stat(uploadPath); os.IsNotExist(err) {
		os.Mkdir(uploadPath, os.ModePerm)
	}

	// Save the uploaded file
	filePath := uploadPath + file.Filename
	if err := ctx.SaveUploadedFile(file, filePath); err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Here, you would typically save the image URL to the database and return it
	imageUrl := fmt.Sprintf("/uploads/%s", file.Filename) // Adjust as necessary
	ctx.JSON(http.StatusOK, gin.H{"imageUrl": imageUrl})
}
