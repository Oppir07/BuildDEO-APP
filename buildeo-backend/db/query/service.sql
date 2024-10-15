-- name: CreateService :execresult
INSERT INTO services (
  seller_id, category_id, title, description, price, created_by, updated_by
) VALUES (
  ?, ?, ?, ?, ?, ?, ?
);

-- name: GetServiceBySeller :many
SELECT * 
FROM services s
LEFT JOIN service_photos sp
ON s.id = sp.service_id
LEFT JOIN categories c
ON s.category_id = c.id
WHERE s.seller_id = ?
ORDER BY s.updated_at DESC;

-- name: GetServiceByCategory :many
SELECT * 
FROM services
WHERE category_id = ?
ORDER BY updated_at DESC;

-- name: GetServiceByID :one
SELECT * 
FROM services s
LEFT JOIN service_photos sp
ON s.id = sp.service_id
WHERE s.id = ?
LIMIT 1;

-- name: ListService :many
SELECT *
FROM services s
LEFT JOIN service_photos sp
ON s.id = sp.service_id
ORDER BY s.id;

-- name: UpdateService :execresult
UPDATE services
SET seller_id = ?, category_id = ?, title = ?, description = ?, price = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteService :exec
DELETE FROM services WHERE id = ?;
