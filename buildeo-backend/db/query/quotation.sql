-- name: CreateQuotation :execresult
INSERT INTO quotations (
  category_id, document_url, status, user_id, description, created_by, updated_by
) VALUES (
  ?, ?, ?, ?, ?, ?, ?
);

-- name: GetQuotation :one
SELECT *
FROM quotations
WHERE id = ?
LIMIT 1;

-- name: ListQuotations :many
SELECT *
FROM quotations
WHERE user_id = ?
ORDER BY id;

-- name: UpdateQuotation :execresult
UPDATE quotations
SET category_id = ?, document_url = ?, status = ?, description = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteQuotation :exec
DELETE FROM quotations WHERE id = ?;
