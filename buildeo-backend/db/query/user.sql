-- name: CreateUser :execresult
INSERT INTO users (
  email, password, firstname, lastname, post_number, street, phone, role, created_by, updated_by
) VALUES (
  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
);

-- name: GetUser :one
SELECT * 
FROM users
WHERE email = ?
LIMIT 1;

-- name: GetUserByID :one
SELECT * 
FROM users
WHERE id = ?
LIMIT 1;


-- name: ListUsers :many
SELECT * 
FROM users
ORDER BY id;

-- name: UpdateUser :execresult
UPDATE users
SET email = ?, password = ?, firstname = ?, lastname = ?, phone = ?, post_number = ?, street = ?, role = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = ?;
