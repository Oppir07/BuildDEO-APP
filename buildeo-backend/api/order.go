package api

import (
	"log"
	"net/http"
	"time"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/gin-gonic/gin"
)

type createOrderRequest struct {
	UserID 		int64 	`json:"user_id" binding:"required"`
	FilePayment 	string 	`json:"file_payment" binding:"required"`
	MethodPayment 	string 	`json:"method_payment" binding:"required"`
	StatusPayment	string	`json:"status_payment" binding:"required"`
}

type orderResponse struct {
	ID 			int64	`json:id`
	UserID		int64	`json:user_id`
	FilePayment	string	`json:file_payment`
	MethodPayment	string	`json:method_payment`
	StatusPayment	string	`json:status_payment`
	CreatedAt   	string 	`json:"created_at"`
	UpdatedAt   	string	`json:"updated_at"`
}

func (server *Server) createOrder(ctx *gin.Context) {
	var req createOrderRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	arg := db.CreateOrderParams{
		UserID:      req.UserID,
		FilePayment:   req.FilePayment,
		MethodPayment: req.MethodPayment,
		StatusPayment:      req.StatusPayment,
	}

	result, err := server.store.CreateOrder(ctx, arg)
	if err != nil {
		log.Printf("Error creating order: %v", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	orderID, err := result.LastInsertId()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch order ID"})
		return
	}

	order, err := server.store.GetOrderByID(ctx, orderID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch order"})
		return
	}

	rsp := orderResponse{
		ID:          order.ID,
		UserID:      order.UserID,
		FilePayment:   order.FilePayment,
		MethodPayment: order.MethodPayment,
		StatusPayment:      order.StatusPayment,
		CreatedAt:   order.CreatedAt.Format(time.RFC3339),
		UpdatedAt:   order.UpdatedAt.Format(time.RFC3339),
	}

	ctx.JSON(http.StatusOK, rsp)
}



