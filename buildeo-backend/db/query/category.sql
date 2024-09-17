-- name: CreateCategory :execresult
INSERT INTO categories (
  name, description, created_by, updated_by
) VALUES (
  ?, ?, ?, ?
);

-- name: GetCategory :one
SELECT * 
FROM categories
WHERE id = ?
LIMIT 1;


-- name: ListCategory :many
SELECT * 
FROM categories c
INNER JOIN services s
ON c.id = s.category_id
INNER JOIN service_photos sp
ON s.id = sp.service_id
ORDER BY c.id;

-- name: UpdateCategory :execresult
UPDATE categories
SET name = ?, description = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteCategory :exec
DELETE FROM categories WHERE id = ?;
