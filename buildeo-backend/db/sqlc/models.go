// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package db

import (
	"database/sql"
	"time"
)

type BasketItem struct {
	ID        int64     `json:"id"`
	BasketID  int64     `json:"basket_id"`
	ServiceID int64     `json:"service_id"`
	Quantity  int32     `json:"quantity"`
	Price     int64     `json:"price"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy int64     `json:"created_by"`
	UpdatedAt time.Time `json:"updated_at"`
	UpdatedBy int64     `json:"updated_by"`
}

type Category struct {
	ID          int64          `json:"id"`
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
	CreatedBy   int64          `json:"created_by"`
	UpdatedAt   time.Time      `json:"updated_at"`
	UpdatedBy   int64          `json:"updated_by"`
}

type Chat struct {
	ID      int64 `json:"id"`
	User1ID int64 `json:"user1_id"`
	User2ID int64 `json:"user2_id"`
	// active or inactive
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy int64     `json:"created_by"`
	UpdatedAt time.Time `json:"updated_at"`
	UpdatedBy int64     `json:"updated_by"`
}

type Message struct {
	ID        int64     `json:"id"`
	ChatID    int64     `json:"chat_id"`
	SenderID  int64     `json:"sender_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy int64     `json:"created_by"`
	UpdatedAt time.Time `json:"updated_at"`
	UpdatedBy int64     `json:"updated_by"`
}

type Offer struct {
	ID          int64          `json:"id"`
	ServiceID   int64          `json:"service_id"`
	RequestID   int64          `json:"request_id"`
	SellerID    int64          `json:"seller_id"`
	Price       int64          `json:"price"`
	Description sql.NullString `json:"description"`
	// pending, accepted, or rejected
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy int64     `json:"created_by"`
	UpdatedAt time.Time `json:"updated_at"`
	UpdatedBy int64     `json:"updated_by"`
}

type Quotation struct {
	ID          int64  `json:"id"`
	CategoryID  int64  `json:"category_id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Address     string `json:"address"`
	DocumentUrl string `json:"document_url"`
	// open, in_progress, or completed
	Status     string         `json:"status"`
	AdminID    sql.NullInt64  `json:"admin_id"`
	AdminNotes sql.NullString `json:"admin_notes"`
	CreatedAt  time.Time      `json:"created_at"`
	CreatedBy  int64          `json:"created_by"`
	UpdatedAt  time.Time      `json:"updated_at"`
	UpdatedBy  int64          `json:"updated_by"`
}

type Request struct {
	ID          int64          `json:"id"`
	CustomerID  int64          `json:"customer_id"`
	CategoryID  int64          `json:"category_id"`
	Title       string         `json:"title"`
	Description sql.NullString `json:"description"`
	Budget      int64          `json:"budget"`
	Deadline    time.Time      `json:"deadline"`
	// open, closed, or fulfilled
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy int64     `json:"created_by"`
	UpdatedAt time.Time `json:"updated_at"`
	UpdatedBy int64     `json:"updated_by"`
}

type Review struct {
	ID         int64          `json:"id"`
	ReviewerID int64          `json:"reviewer_id"`
	RevieweeID int64          `json:"reviewee_id"`
	ServiceID  int64          `json:"service_id"`
	Rating     int32          `json:"rating"`
	Comment    sql.NullString `json:"comment"`
	CreatedAt  time.Time      `json:"created_at"`
	CreatedBy  int64          `json:"created_by"`
	UpdatedAt  time.Time      `json:"updated_at"`
	UpdatedBy  int64          `json:"updated_by"`
}

type Service struct {
	ID          int64          `json:"id"`
	SellerID    int64          `json:"seller_id"`
	CategoryID  int64          `json:"category_id"`
	Title       string         `json:"title"`
	Description sql.NullString `json:"description"`
	Price       int64          `json:"price"`
	CreatedAt   time.Time      `json:"created_at"`
	CreatedBy   int64          `json:"created_by"`
	UpdatedAt   time.Time      `json:"updated_at"`
	UpdatedBy   int64          `json:"updated_by"`
}

type ServicePhoto struct {
	ID        int64     `json:"id"`
	ServiceID int64     `json:"service_id"`
	PhotoUrl  string    `json:"photo_url"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy int64     `json:"created_by"`
	UpdatedAt time.Time `json:"updated_at"`
	UpdatedBy int64     `json:"updated_by"`
}

type ShoppingBasket struct {
	ID        int64     `json:"id"`
	UserID    int64     `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy int64     `json:"created_by"`
	UpdatedAt time.Time `json:"updated_at"`
	UpdatedBy int64     `json:"updated_by"`
}

type Transaction struct {
	ID            int64  `json:"id"`
	UserID        int64  `json:"user_id"`
	BasketID      int64  `json:"basket_id"`
	Amount        int64  `json:"amount"`
	PaymentMethod string `json:"payment_method"`
	// pending, completed, or failed
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy int64     `json:"created_by"`
	UpdatedAt time.Time `json:"updated_at"`
	UpdatedBy int64     `json:"updated_by"`
}

type User struct {
	ID         int64  `json:"id"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Firstname  string `json:"firstname"`
	Lastname   string `json:"lastname"`
	PostNumber string `json:"post_number"`
	Street     string `json:"street"`
	Phone      string `json:"phone"`
	// buyer, seller, or admin
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy int64     `json:"created_by"`
	UpdatedAt time.Time `json:"updated_at"`
	UpdatedBy int64     `json:"updated_by"`
}
