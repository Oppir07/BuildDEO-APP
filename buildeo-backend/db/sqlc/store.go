package db

import (
	"context"
	"database/sql"
	"fmt"
)

// Store provides all functions to execute db queries and transactions
type Store interface {
	Querier
	ExecTx(ctx context.Context, fn func(*Queries) error) error
}

// SQLStore provides all functions to execute SQL queries and transactions
type SQLStore struct {
	db *sql.DB
	*Queries
}

// NewStore creates a new Store
func NewStore(db *sql.DB) Store {
	return &SQLStore{
		db:      db,
		Queries: New(db),
	}
}

// ExecTx executes a function within a database transaction
func (store *SQLStore) ExecTx(ctx context.Context, fn func(*Queries) error) error {
	tx, err := store.db.BeginTx(ctx, nil)  // Mulai transaksi
	if err != nil {
		return err  // Jika ada error saat memulai transaksi
	}

	// Buat instance Queries menggunakan transaction
	q := New(tx)
	err = fn(q)  // Panggil fungsi transaksi
	if err != nil {
		// Jika ada error saat menjalankan transaksi, lakukan rollback
		if rbErr := tx.Rollback(); rbErr != nil {
			return fmt.Errorf("tx err: %v, rb err: %v", err, rbErr)
		}
		return err  // Kembalikan error
	}

	// Jika tidak ada error, commit transaksi
	return tx.Commit()
}
