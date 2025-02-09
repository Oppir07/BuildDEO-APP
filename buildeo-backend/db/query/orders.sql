-- name: CreateOrder :execresult
INSERT INTO orders (
  user_id,file_payment, method_payment, status_payment
) VALUES (
  ?, ?, ?, ?
);

-- name: GetOrderByID :one
SELECT *
FROM orders
WHERE id = ?
LIMIT 1;

-- name: ListOrders :many
SELECT *
FROM orders
ORDER BY created_at DESC;

-- name: UpdateOrderStatus :execresult
UPDATE orders
SET status_payment = ? , updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteOrder :exec
DELETE FROM orders
WHERE id = ?;
