-- name: CreateServicePhoto :execresult
INSERT INTO service_photos (
  service_id, photo_url, created_by, updated_by
) VALUES (
  ?, ?, ?, ?
);

-- name: GetServicePhotosByServiceID :one
SELECT *
FROM service_photos
WHERE service_id = ?
LIMIT 1;

-- name: GetServicePhotoByID :one
SELECT *
FROM service_photos
WHERE id = ?
LIMIT 1;

-- name: ListServicePhotos :many
SELECT *
FROM service_photos 
ORDER BY updated_at DESC;

-- name: UpdateServicePhoto :execresult
UPDATE service_photos
SET photo_url = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
WHERE service_id = ?;

-- name: DeleteServicePhoto :exec
DELETE FROM service_photos WHERE service_id = ?;

