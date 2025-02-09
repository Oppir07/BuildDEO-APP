-- name: CreateItemOrder :execresult
INSERT INTO items_order (
  order_id, seller_id, quantity, price, status_service, start_date
) VALUES (
  ?, ?, ?, ?, ?, ?
);

-- name: GetItemOrderByID :one
SELECT *
FROM items_order
WHERE id = ?
LIMIT 1;

-- name: ListItemOrders :many
SELECT *
FROM items_order
ORDER BY created_at DESC;

-- name: UpdateItemOrderStatus :execresult
UPDATE items_order
SET status_service = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteItemOrder :exec
DELETE FROM items_order
WHERE id = ?;
