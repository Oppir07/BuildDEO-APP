package api

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/gin-gonic/gin"
)

type createCategoryRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
	CreatedBy   int64  `json:"created_by" binding:"required"`
	UpdatedBy   int64  `json:"updated_by" binding:"required"`
}

type categoryResponse struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CreatedAt   string `json:"created_at"`
	CreatedBy   int64  `json:"created_by"`
	UpdatedAt   string `json:"updated_at"`
	UpdatedBy   int64  `json:"updated_by"`
}

// Response structure for categories detail with its service
type categoryFullResponse struct {
	ID          int64                 `json:"id"`
	Name        string                `json:"name"`
	Description string                `json:"description"`
	Services    []serviceFullResponse `json:"services"` // Add services field
	CreatedAt   time.Time             `json:"created_at"`
	UpdatedAt   time.Time             `json:"updated_at"`
}

func newCategoryResponse(category db.Category) categoryResponse {
	return categoryResponse{
		ID:          category.ID,
		Name:        category.Name,
		Description: category.Description.String,
		CreatedAt:   category.CreatedAt.Format(time.RFC3339),
		CreatedBy:   category.CreatedBy,
		UpdatedAt:   category.UpdatedAt.Format(time.RFC3339),
		UpdatedBy:   category.UpdatedBy,
	}
}

func newCategoryFullResponse(category db.ListCategoryRow, services []serviceFullResponse) categoryFullResponse {
	return categoryFullResponse{
		ID:          category.ID,
		Name:        category.Name,
		Description: category.Description.String,
		Services:    services,
		CreatedAt:   category.CreatedAt,
		UpdatedAt:   category.UpdatedAt,
	}
}

func (server *Server) createCategory(ctx *gin.Context) {
	var req createCategoryRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateCategoryParams{
		Name:        req.Name,
		Description: sql.NullString{String: req.Description, Valid: true},
		CreatedBy:   req.CreatedBy,
		UpdatedBy:   req.UpdatedBy,
	}

	category, err := server.store.CreateCategory(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	categoryID, err := category.LastInsertId()

	result, err := server.store.GetCategory(ctx, categoryID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newCategoryResponse(result)
	ctx.JSON(http.StatusOK, rsp)
}

type getCategoryRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

func (server *Server) getCategory(ctx *gin.Context) {
	var req getCategoryRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	category, err := server.store.GetCategory(ctx, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newCategoryResponse(category)
	ctx.JSON(http.StatusOK, rsp)
}

func (server *Server) listCategory(ctx *gin.Context) {
	categories, err := server.store.ListCategory(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, categories)
}

type updateCategoryRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
	UpdatedBy   int64  `json:"updated_by" binding:"required"`
}

func (server *Server) updateCategory(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	var req updateCategoryRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.UpdateCategoryParams{
		ID:          id,
		Name:        req.Name,
		Description: sql.NullString{String: req.Description, Valid: true},
		UpdatedBy:   req.UpdatedBy,
	}

	_, err = server.store.UpdateCategory(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	category, err := server.store.GetCategory(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newCategoryResponse(category)
	ctx.JSON(http.StatusOK, rsp)
}

type deleteCategoryRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

func (server *Server) deleteCategory(ctx *gin.Context) {
	var req deleteCategoryRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	err := server.store.DeleteCategory(ctx, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "category deleted successfully"})
}

func (server *Server) getAllCategoriesWithServices(ctx *gin.Context) {
    // Fetch all categories
    categories, err := server.store.ListCategory(ctx)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "error fetching categories"})
        return
    }

    // Fetch all services and their photos
    services, err := server.store.ListService(ctx)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "error fetching services"})
        return
    }

    // Map to hold services grouped by category ID
    servicesByCategory := make(map[int64]map[int64]serviceFullResponse)

    // Map to hold photos grouped by service ID
    photosByService := make(map[int64][]string)

    // Populate the photosByService map
    for _, service := range services {
        if _, exists := photosByService[service.ID]; !exists {
            photosByService[service.ID] = []string{}
        }
        // Assuming service.PhotoUrl is the photo URL field; adjust if needed
        photosByService[service.ID] = append(photosByService[service.ID], service.PhotoUrl)
    }

    // Populate servicesByCategory map
    for _, service := range services {
        serviceResp := serviceFullResponse{
            ID:          service.ID,
            SellerID:    service.SellerID,
            CategoryID:  service.CategoryID,
            Title:       service.Title,
            Description: service.Description.String,
            Price:       service.Price,
            Photos:      photosByService[service.ID],
            CreatedAt:   service.CreatedAt,
            UpdatedAt:   service.UpdatedAt,
        }

        if _, exists := servicesByCategory[service.CategoryID]; !exists {
            servicesByCategory[service.CategoryID] = make(map[int64]serviceFullResponse)
        }
        servicesByCategory[service.CategoryID][service.ID] = serviceResp
    }

    // Map to hold the final response
    categoryResponses := []categoryFullResponse{}
    addedCategories := make(map[int64]bool)

    // Populate the final response with categories and their services
    for _, category := range categories {
        if _, exists := addedCategories[category.ID]; exists {
            continue
        }

        servicesForCategory := []serviceFullResponse{}
        if services, exists := servicesByCategory[category.ID]; exists {
            for _, service := range services {
                servicesForCategory = append(servicesForCategory, service)
            }
        }

        categoryResponse := categoryFullResponse{
            ID:          category.ID,
            Name:        category.Name,
            Description: category.Description.String,
            Services:    servicesForCategory,
            CreatedAt:   category.CreatedAt,
            UpdatedAt:   category.UpdatedAt,
        }
        categoryResponses = append(categoryResponses, categoryResponse)
        addedCategories[category.ID] = true
    }

    // Return all categories with their associated services
    ctx.JSON(http.StatusOK, categoryResponses)
}