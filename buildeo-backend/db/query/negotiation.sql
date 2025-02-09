-- name: CreateNegotiation :execresult
INSERT INTO negotiation (
  items_order_id, items_offer_id, status_negotiation, final_price
) VALUES (
  ?, ?, ?, ?
);

-- name: GetNegotiationByID :one
SELECT *
FROM negotiation
WHERE id = ?
LIMIT 1;

-- name: ListNegotiations :many
SELECT *
FROM negotiation
ORDER BY created_at DESC;

-- name: UpdateNegotiation :execresult
UPDATE negotiation
SET status_negotiation = ?, final_price = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteNegotiation :exec
DELETE FROM negotiation
WHERE id = ?;

-- name: GetNegotiationsByOrderID :many
SELECT *
FROM negotiation
WHERE items_order_id = ?
ORDER BY created_at DESC;

-- name: GetNegotiationsByOfferID :many
SELECT *
FROM negotiation
WHERE items_offer_id = ?
ORDER BY created_at DESC;
