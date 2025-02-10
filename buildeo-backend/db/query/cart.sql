-- name: AddToCart :execresult
INSERT INTO cart (
  service_id, seller_id, category_id, quantity, price
) VALUES (
  ?, ?, ?, ?, ?
);

-- name: GetCartItem :one
SELECT * 
FROM cart
WHERE id = ?
LIMIT 1;

-- name: ListCartItems :many
SELECT * 
FROM cart
ORDER BY updated_at DESC;

-- name: UpdateCartItem :execresult
UPDATE cart
SET quantity = ?, price = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteCartItem :exec
DELETE FROM cart WHERE id = ?;
