package api

import (
	"bytes"
	"database/sql"
	"fmt"
	"html/template"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/Oppir07/BuildDEO-APP/token"
	"github.com/Oppir07/BuildDEO-APP/util"
	"github.com/gin-gonic/gin"
	"gopkg.in/gomail.v2"
)

// Request and Response Structs

type createQuotationRequest struct {
	CategoryID  int64  `form:"category_id"`
	DocumentUrl string `form:"document_url" binding:"omitempty"`
	Status      string `form:"status" binding:"required"`
	Email       string `form:"email" binding:"required"`
	Firstname   string `form:"firstname" binding:"required"`
	Lastname    string `form:"lastname" binding:"required"`
	PostNumber  string `form:"post_number" binding:"required"`
	Street      string `form:"street" binding:"required"`
	Phone       string `form:"phone" binding:"required"`
	Description string `form:"description" binding:"omitempty"`
	UserID      int64  `form:"user_id"`
}

type quotationResponse struct {
	ID          int64     `json:"id"`
	CategoryID  int64     `json:"category_id,omitempty"`  // Optional, defaults to null if not provided
	DocumentUrl string    `json:"document_url,omitempty"` // Optional
	Status      string    `json:"status"`
	UserID      int64     `json:"user_id,omitempty"`     // User ID linked to the quotation
	Description string    `json:"description,omitempty"` // Optional
	CreatedAt   time.Time `json:"created_at"`
	CreatedBy   int64     `json:"created_by"`
	UpdatedAt   time.Time `json:"updated_at"`
	UpdatedBy   int64     `json:"updated_by"`
}

func newQuotationResponse(quotation db.Quotation) quotationResponse {
	return quotationResponse{
		ID:          quotation.ID,
		CategoryID:  quotation.CategoryID.Int64,
		DocumentUrl: quotation.DocumentUrl.String,
		Status:      quotation.Status,
		UserID:      quotation.UserID.Int64,
		Description: quotation.Description.String,
		CreatedAt:   quotation.CreatedAt,
		CreatedBy:   quotation.CreatedBy,
		UpdatedAt:   quotation.UpdatedAt,
		UpdatedBy:   quotation.UpdatedBy,
	}
}

func (server *Server) createQuotation(ctx *gin.Context) {
	var req createQuotationRequest
	if err := ctx.ShouldBind(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("failed to bind request: %w", err)))
		return
	}

	if req.CategoryID == 0 {
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("category_id is required")))
		return
	}

	// Verify the document URL if provided
	var documentURL sql.NullString
	if req.DocumentUrl != "" {
		documentURL = sql.NullString{String: req.DocumentUrl, Valid: true}
	}

	// Generate a random 6-digit token
	token := generateRandomToken()

	hashedPassword, err := util.HashPassword(token)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var createdQuotation db.Quotation
	err = server.store.(*db.SQLStore).ExecTx(ctx, func(q *db.Queries) error {
		userArg := db.CreateUserParams{
			Email:      req.Email,
			Password:   hashedPassword,
			Firstname:  req.Firstname,
			Lastname:   req.Lastname,
			PostNumber: req.PostNumber,
			Street:     req.Street,
			Phone:      req.Phone,
			Role:       "buyer",
			CreatedBy:  0,
			UpdatedBy:  0,
		}

		result, err := q.CreateUser(ctx, userArg)
		if err != nil {
			return fmt.Errorf("failed to create user: %w", err)
		}
		userID, err := result.LastInsertId()
		if err != nil {
			return fmt.Errorf("failed to retrieve user ID: %w", err)
		}

		quotationArg := db.CreateQuotationParams{
			CategoryID:  sql.NullInt64{Int64: req.CategoryID, Valid: true},
			DocumentUrl: documentURL,
			Status:      req.Status,
			UserID:      sql.NullInt64{Int64: userID, Valid: true},
			Description: sql.NullString{String: req.Description, Valid: req.Description != ""},
			CreatedBy:   userID,
			UpdatedBy:   userID,
		}

		result, err = q.CreateQuotation(ctx, quotationArg)
		if err != nil {
			return fmt.Errorf("failed to create quotation: %w", err)
		}

		quotationID, err := result.LastInsertId()
		if err != nil {
			return fmt.Errorf("failed to retrieve quotation ID: %w", err)
		}
		createdQuotation, err = q.GetQuotation(ctx, quotationID)
		if err != nil {
			return fmt.Errorf("failed to fetch created quotation: %w", err)
		}
		return nil
	})

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	FullName := req.Firstname + " " + req.Lastname

	sendGoMail("login.html", req.Email, token, FullName)

	ctx.JSON(http.StatusOK, newQuotationResponse(createdQuotation))
}

func (server *Server) uploadQuotation(ctx *gin.Context) {
	file, err := ctx.FormFile("document_url")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("error reading file: %w", err)))
		return
	}

	if file.Size == 0 {
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("file is empty")))
		return
	}

	fileURL, err := uploadFileQuotation(ctx, quotationDir, "document_url")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(fmt.Errorf("failed to upload file: %w", err)))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"file_url": fileURL})
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
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Check if the logged-in user is the owner of the quotation
	if quotation.UserID.Int64 != user.ID {
		ctx.JSON(http.StatusForbidden, errorResponse(fmt.Errorf("not authorized to access this resource")))
		return
	}

	ctx.JSON(http.StatusOK, newQuotationResponse(quotation))
}

func (server *Server) listQuotations(ctx *gin.Context) {
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	// Fetch the authenticated user
	_, err := server.store.GetUser(ctx, authPayload.Username)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Use the user's ID directly for listing quotations
	quotations, err := server.store.ListQuotations(ctx, )
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Return the list of quotations
	ctx.JSON(http.StatusOK, quotations)
}

// Update Quotation Handler
type updateQuotationRequest struct {
	CategoryID  int64  `json:"category_id"`
	DocumentUrl string `json:"document_url" binding:"omitempty,url"`
	Status      string `json:"status" binding:"required"`
	Name        string `json:"name" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Phone       string `json:"phone" binding:"required"`
	Address     string `json:"address" binding:"required"`
	Description string `json:"description" binding:"omitempty"`
	AdminID     int64  `json:"admin_id"`
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

	// Construct the update parameters, fall back to existing values if not provided
	arg := db.UpdateQuotationParams{
		ID:          id,
		CategoryID:  sql.NullInt64{Int64: req.CategoryID, Valid: req.CategoryID != 0},
		DocumentUrl: sql.NullString{String: req.DocumentUrl, Valid: req.DocumentUrl != ""},
		Status:      req.Status,
		Description: sql.NullString{String: req.Description, Valid: req.Description != ""},
		UpdatedBy:   req.UpdatedBy,
	}

	// If categoryID is not provided, use existing one
	if !arg.CategoryID.Valid {
		arg.CategoryID = existingQuotation.CategoryID
	}

	_, err = server.store.UpdateQuotation(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Fetch the updated quotation
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

func sendGoMail(templatePath string, recipient string, token string, name string) {
	// Get HTML template and prepare dynamic content
	var body bytes.Buffer
	t, err := template.ParseFiles(templatePath)
	if err != nil {
		fmt.Println("Error parsing template:", err)
		return
	}

	// Execute template with dynamic values
	data := struct {
		Name  string
		Token string
	}{
		Name:  name,  // You can personalize this if needed
		Token: token, // Pass the login token
	}

	err = t.Execute(&body, data)
	if err != nil {
		fmt.Println("Error executing template:", err)
		return
	}

	// Email details
	sender := "app@buildeo.de"
	password := "appOstroph$43991" // Be sure to handle this securely in production
	subject := "Login to Buildeo App"
	bodyContent := body.String()

	// Create a new email message
	m := gomail.NewMessage()
	m.SetHeader("From", sender)
	m.SetHeader("To", recipient)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", bodyContent)

	// Set up the SMTP dialer for Strato SMTP server
	d := gomail.NewDialer("smtp.strato.de", 465, sender, password)
	d.SSL = true // Enable SSL (use 465 port for SSL)

	// Send the email
	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}

	fmt.Println("Email sent successfully!")
}

// Function to generate a random 6-digit token
func generateRandomToken() string {
	// Seed the random number generator
	rand.Seed(time.Now().UnixNano())

	// Generate a random 6-digit number
	token := rand.Intn(900000) + 100000 // Ensures it's a 6-digit number (between 100000 and 999999)

	// Return as a string
	return fmt.Sprintf("%d", token)
}
