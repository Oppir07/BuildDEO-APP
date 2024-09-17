-- name: CreateQuotation :execresult
INSERT INTO quotations (
  category_id, name, email, phone, address, document_url, status, admin_id, admin_notes, created_by, updated_by
) VALUES (
  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
);

-- name: GetQuotation :one
SELECT *
FROM quotations
WHERE id = ?
LIMIT 1;

-- name: ListQuotations :many
SELECT *
FROM quotations
WHERE admin_id = ?
ORDER BY id;

-- name: UpdateQuotation :execresult
UPDATE quotations
SET category_id = ?, name = ?, email = ?, phone = ?, address = ?, document_url = ?, status = ?, admin_id = ?, admin_notes = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteQuotation :exec
DELETE FROM quotations WHERE id = ?;
