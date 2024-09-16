-- name: CreateServicePhoto :execresult
INSERT INTO service_photos (
  service_id, photo_url, created_by, updated_by
) VALUES (
  ?, ?, ?, ?
);

-- name: GetServicePhotosByServiceID :many
SELECT *
FROM service_photos
WHERE service_id = ?;

-- name: GetServicePhotoByID :one
SELECT *
FROM service_photos
WHERE id = ?
LIMIT 1;

-- name: ListServicePhotos :many
SELECT *
FROM service_photos 
ORDER BY id;

-- name: UpdateServicePhoto :execresult
UPDATE service_photos
SET service_id = ?, photo_url = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteServicePhoto :exec
DELETE FROM service_photos WHERE id = ?;

