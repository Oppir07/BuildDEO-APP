package api

import (
	"fmt"
	"time"
    "os"
    "path/filepath"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/Oppir07/BuildDEO-APP/token"
	"github.com/Oppir07/BuildDEO-APP/util"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Server serves HTTP requests for service
type Server struct {
	config     util.Config
	store      db.Store
	tokenMaker token.Maker
	router     *gin.Engine
}

// NewServer creates a new HTTP server and setup routing.
func NewServer(config util.Config, store db.Store) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %w", err)
	}

	server := &Server{
		config:     config,
		store:      store,
		tokenMaker: tokenMaker,
	}

	server.setupRouter()
	return server, nil
}

func (server *Server) setupRouter() {
	router := gin.Default()

	// Add CORS middleware
	router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"https://buildeo.de", "http://localhost:5173","http://127.0.0.1:8080"}, // Allow production and localhost origins
        AllowMethods:     []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

	//authentication
	router.POST("/users/login", server.loginUser)
	router.POST("/users", server.createUser)

	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))

	// user management
	router.GET("/users/:id", server.getUser)
	router.GET("/users", server.listUser)
	router.PUT("/users/:id", server.updateUser)
	router.DELETE("/users/:id", server.deleteUser)

	// quotation management
	router.POST("/quotation", server.createQuotation)
	authRoutes.GET("/quotation/:id", server.getQuotation)
	authRoutes.GET("/quotation", server.listQuotations)
	authRoutes.PUT("/quotation/:id", server.updateQuotation)
	authRoutes.DELETE("/quotation/:id", server.deleteQuotation)

	// category management
	authRoutes.POST("/categories", server.createCategory)
	router.GET("/categories/:id", server.getCategory)
	router.GET("/categories", server.getAllCategoriesWithServices)
	authRoutes.PUT("/categories/:id", server.updateCategory)
	authRoutes.DELETE("/categories/:id", server.deleteCategory)

	// service management
	authRoutes.POST("/services", server.createService)
	router.GET("/services/:id", server.getService)
	router.GET("/services", server.getAllServicesWithPhotos)
	authRoutes.PUT("/services/:id", server.updateService)
	authRoutes.DELETE("/services/:id", server.deleteService)
	router.GET("/services/seller/:seller_id", server.getServicesBySeller)

	// service photo management
	authRoutes.POST("/services/photos", server.createServicePhoto)
	router.GET("/services/photos/:id", server.getServicePhoto)
	router.GET("/services/photos", server.listServicePhotos)
	authRoutes.PUT("/services/photos/:id", server.updateServicePhoto)
	authRoutes.DELETE("/services/photos/:id", server.deleteServicePhoto)

	// Get the current working directory for serving static files
    cwd, err := os.Getwd()
    if err != nil {
        panic(fmt.Sprintf("failed to get working directory: %v", err))
    }

    // Serve static files from the absolute path
    router.Static("/uploads", filepath.Join(cwd, "uploads"))

	server.router = router
}

// Start runs the HTTP server on a specific address.
func (server *Server) Start(address string) error {
	return server.router.RunTLS(address,"server.pem", "server.key")
}

// Start runs the HTTP server on a specific address.
func (server *Server) TestStart(address string) error {
	return server.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
