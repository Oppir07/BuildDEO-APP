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

// Response structure for service details with its photos
type serviceResponse struct {
	ID          int64     `json:"id"`
	SellerID    int64     `json:"seller_id"`
	CategoryID  int64     `json:"category_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Price       int64     `json:"price"`
	Photos      []string  `json:"photos"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Response structure for service detail with its photos and category
type serviceFullResponse struct {
	ID           int64     `json:"id"`
	SellerID     int64     `json:"seller_id"`
	CategoryID   int64     `json:"category_id"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
	Price        int64     `json:"price"`
	Photos       []string  `json:"photos"` // Add photos field
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// Helper function to convert db.Service to serviceResponse
func newServiceResponse(service db.GetServiceByIDRow) serviceResponse {
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

func newServiceFullResponse(service db.GetServiceByIDRow, photos []string) serviceFullResponse {
	return serviceFullResponse{
		ID:          service.ID,
		SellerID:    service.SellerID,
		CategoryID:  service.CategoryID,
		Title:       service.Title,
		Description: service.Description.String,
		Price:       service.Price,
		Photos:      photos,
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

	// Fetch the service details
	service, err := server.store.GetServiceByID(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Collect all photos associated with the service
	photos, err := server.store.GetServicePhotosByServiceID(ctx, id) // You'll need this function to list photos
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Map photo URLs into a slice
	photoUrls := []string{}
	for _, photo := range photos {
		photoUrls = append(photoUrls, photo.PhotoUrl)
	}

	// Respond with the full service details and photos
	rsp := newServiceFullResponse(service, photoUrls)
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

func (server *Server) listService(ctx *gin.Context) {
	services, err := server.store.ListService(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, services)
}

// Get all services with their photos by seller ID
func (server *Server) getServicesBySeller(ctx *gin.Context) {
	sellerIDParam := ctx.Param("seller_id")
	sellerID, err := strconv.ParseInt(sellerIDParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// Fetch the services by seller ID
	services, err := server.store.GetServiceBySeller(ctx, sellerID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Map the service details and their photos
	serviceResponses := []serviceFullResponse{}
	serviceMap := make(map[int64]serviceFullResponse)

	// Loop through the services and build the response
	for _, service := range services {
		if _, exists := serviceMap[service.ID]; !exists {
			// If the service is not yet in the map, create a new entry
			serviceMap[service.ID] = serviceFullResponse{
				ID:           service.ID,
				SellerID:     service.SellerID,
				CategoryID:   service.CategoryID,
				Title:        service.Title,
				Description:  service.Description.String,
				Price:        service.Price,
				Photos:       []string{service.PhotoUrl.String}, // Initialize with the first photo
				CreatedAt:    service.CreatedAt,
				UpdatedAt:    service.UpdatedAt,
			}
		} else {
			// If the service already exists in the map, append the new photo
			serviceResponse := serviceMap[service.ID]
			serviceResponse.Photos = append(serviceResponse.Photos, service.PhotoUrl.String)
			serviceMap[service.ID] = serviceResponse
		}
	}

	// Convert the map to a slice for the response
	for _, service := range serviceMap {
		serviceResponses = append(serviceResponses, service)
	}

	// Send the response with all services and their photos
	ctx.JSON(http.StatusOK, serviceResponses)
}

// Get all services with their photos
func (server *Server) getAllServicesWithPhotos(ctx *gin.Context) {
	// Fetch all services
	serviceRows, err := server.store.ListService(ctx) // This fetches ListServiceRow data
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "error fetching services"})
		return
	}

	// Map to hold the grouped services by service ID
	serviceMap := make(map[int64]*serviceFullResponse)

	// Iterate over each service and group photos by service ID
	for _, service := range serviceRows {
		// If the service is already in the map, append the photo to its list
		if existingService, exists := serviceMap[service.ID]; exists {
			existingService.Photos = append(existingService.Photos, service.PhotoUrl.String)
		} else {
			// Create a new entry for the service
			photoUrls := []string{}
			if service.PhotoUrl.String != "" {
				photoUrls = append(photoUrls, service.PhotoUrl.String)
			}

			// Manually map ListServiceRow to serviceFullResponse
			newService := serviceFullResponse{
				ID:          service.ID,
				SellerID:    service.SellerID,
				CategoryID:  service.CategoryID,
				Title:       service.Title,
				Description: service.Description.String,
				Price:       service.Price,
				Photos:      photoUrls,
				CreatedAt:   service.CreatedAt,
				UpdatedAt:   service.UpdatedAt,
			}
			serviceMap[service.ID] = &newService
		}
	}

	// Convert map to slice for response
	var servicesResponse []serviceFullResponse
	for _, service := range serviceMap {
		servicesResponse = append(servicesResponse, *service)
	}

	// Return all services with their associated photos
	ctx.JSON(http.StatusOK, servicesResponse)
}
