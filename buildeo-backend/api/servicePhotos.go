package api

import (
	"database/sql"
	"fmt"
	"io"
	"log"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/pkg/sftp"
	"golang.org/x/crypto/ssh"

	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/gin-gonic/gin"
)

// createServicePhotoRequest is the structure for the request payload
type createServicePhotoRequest struct {
	ServiceID int64  `json:"service_id" binding:"required"`
	PhotoUrl  string `json:"photo_url" binding:"required"`
	CreatedBy int64  `json:"created_by" binding:"required"`
	UpdatedBy int64  `json:"updated_by" binding:"required"`
}

// Response structure for service photo details
type servicePhotoResponse struct {
	ID        int64     `json:"id"`
	ServiceID int64     `json:"service_id"`
	PhotoUrl  string    `json:"photo_url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Helper function to convert db.ServicePhoto to servicePhotoResponse
func newServicePhotoResponse(photo db.ServicePhoto) servicePhotoResponse {
	return servicePhotoResponse{
		ID:        photo.ID,
		ServiceID: photo.ServiceID,
		PhotoUrl:  photo.PhotoUrl,
		CreatedAt: photo.CreatedAt,
		UpdatedAt: photo.UpdatedAt,
	}
}

// CreateServicePhoto handles the creation of a new service photo with image upload
func (server *Server) createServicePhoto(ctx *gin.Context) {

	// Get service ID, created_by, and updated_by from form data
	serviceIDStr := ctx.PostForm("service_id")
	createdByStr := ctx.PostForm("created_by")
	updatedByStr := ctx.PostForm("updated_by")

	serviceID, err := strconv.ParseInt(serviceIDStr, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	createdBy, err := strconv.ParseInt(createdByStr, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	updatedBy, err := strconv.ParseInt(updatedByStr, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	// Call uploadServicePhoto to handle the file upload
	photoURL, err := server.uploadServicePhoto(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Insert the record with the returned photo URL
	arg := db.CreateServicePhotoParams{
		ServiceID: serviceID,
		PhotoUrl:  photoURL,
		CreatedBy: createdBy,
		UpdatedBy: updatedBy,
	}

	log.Printf("CreateServicePhotoParams: %+v", arg)

	photo, err := server.store.CreateServicePhoto(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// Return the inserted photo response
	photoID, err := photo.LastInsertId()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	result, err := server.store.GetServicePhotoByID(ctx, photoID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServicePhotoResponse(result)
	ctx.JSON(http.StatusOK, rsp)
}

// Upload service photo to SFTP and return the URL
func (server *Server) uploadServicePhoto(ctx *gin.Context) (string, error) {

	log.Println("Starting upload service photo...")

	file, header, err := ctx.Request.FormFile("photo")
	if err != nil {
		log.Printf("Error reading photo: %v\n", err)
		return "", fmt.Errorf("error reading photo: %w", err)
	}
	defer file.Close()

	// Connect to SFTP server
	client, err := getSFTPClient()
	if err != nil {
		log.Printf("Failed to connect to SFTP server: %v\n", err)
		return "", fmt.Errorf("failed to connect to SFTP server: %w", err)
	}
	defer client.Close()

	// Check if /uploads directory exists, and create it if not
	uploadDir := "/kunden/pages/02/fb/d0016960/home/htdocs/uploads"
	log.Printf("Checking if directory %s exists...\n", uploadDir)
	if _, err := client.Stat(uploadDir); err != nil {
		// If directory doesn't exist, try to create it
		log.Printf("Directory %s doesn't exist. Attempting to create...\n", uploadDir)
		err := client.Mkdir(uploadDir)
		if err != nil {
			log.Printf("Failed to create directory %s: %v\n", uploadDir, err)
			return "", fmt.Errorf("failed to create directory on SFTP server: %w", err)
		}
		log.Printf("Successfully created directory %s.\n", uploadDir)
	} else {
		log.Printf("Directory %s already exists.\n", uploadDir)
	}

	// Create a destination file path
	fileName := fmt.Sprintf("%d-%s", time.Now().Unix(), getFirstWord(header.Filename))
	dstPath := fmt.Sprintf("%s/%s", uploadDir, fileName)
	log.Printf("Attempting to upload file to SFTP path: %s\n", dstPath)

	// Create destination file on SFTP server
	dstFile, err := client.Create(dstPath)
	if err != nil {
		log.Printf("Failed to create file on SFTP server: %v\n", err)
		return "", fmt.Errorf("failed to create file on SFTP server: %w", err)
	}
	defer dstFile.Close()

	// Copy the uploaded file to the destination file
	log.Printf("Copying file to destination: %s\n", dstPath)
	_, err = io.Copy(dstFile, file)
	if err != nil {
		log.Printf("Failed to upload file: %v\n", err)
		return "", fmt.Errorf("failed to upload file: %w", err)
	}

	// Return the file URL
	fileURL := fmt.Sprintf("https://%s/uploads/%s", sftDomain, fileName)
	log.Printf("File uploaded successfully. File URL: %s\n", fileURL)

	return fileURL, nil // Return the file URL
}

// Get a service photo by ID
func (server *Server) getServicePhoto(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	photo, err := server.store.GetServicePhotosByServiceID(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServicePhotoResponse(photo)
	ctx.JSON(http.StatusOK, rsp)
}

func (server *Server) listServicePhotos(ctx *gin.Context) {

	photos, err := server.store.ListServicePhotos(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var rsp []servicePhotoResponse
	for _, photo := range photos {
		rsp = append(rsp, newServicePhotoResponse(photo))
	}

	ctx.JSON(http.StatusOK, rsp)
}

// Update a service photo
type updateServicePhotoRequest struct {
	ServiceID int64  `json:"service_id" binding:"required"`
	PhotoUrl  string `json:"photo_url" binding:"required"`
	UpdatedBy int64  `json:"updated_by" binding:"required"`
}

// Update a service photo
func (server *Server) updateServicePhoto(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// Parse the form input to allow for file and non-file field extraction
	if err := ctx.Request.ParseMultipartForm(10 << 20); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// Get updated_by from form data
	updatedBy := ctx.Request.FormValue("updated_by")
	if updatedBy == "" {
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("missing updated_by field")))
		return
	}
	updatedByInt, err := strconv.ParseInt(updatedBy, 10, 64)

	// Get the photo file from the form data
	file, _, err := ctx.Request.FormFile("photo")
	if err != nil && err != http.ErrMissingFile {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	var photoURL string
	if file != nil {
		// If a new file is uploaded, handle the file upload
		photoURL, err = server.uploadServicePhoto(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}
	} else {
		// If no new file is uploaded, use the existing photo URL
		existingPhoto, err := server.store.GetServicePhotoByID(ctx, id)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}
		photoURL = existingPhoto.PhotoUrl
	}

	arg := db.UpdateServicePhotoParams{
		PhotoUrl:  photoURL,
		UpdatedBy: updatedByInt,
		ServiceID: id,
	}

	log.Printf("UpdateServicePhotoParams: %+v", arg)

	_, err = server.store.UpdateServicePhoto(ctx, arg)
	if err != nil {
		log.Printf("Error updating service photo: %v", err) // Add this line to log the error
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	updatedPhoto, err := server.store.GetServicePhotosByServiceID(ctx, id)
	if err != nil {
		log.Printf("Error updating service photo: %v", err) 
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := newServicePhotoResponse(updatedPhoto)
	ctx.JSON(http.StatusOK, rsp)
}

// Delete a service photo and remove the file from the SFTP server
func (server *Server) deleteServicePhoto(ctx *gin.Context) {
    idParam := ctx.Param("id")
    id, err := strconv.ParseInt(idParam, 10, 64)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, errorResponse(err))
        return
    }

    // Retrieve the service photo from the database to get the photo URL
    photo, err := server.store.GetServicePhotosByServiceID(ctx, id)
    if err != nil {
        if err == sql.ErrNoRows {
            ctx.JSON(http.StatusNotFound, errorResponse(fmt.Errorf("photo not found")))
            return
        }
        ctx.JSON(http.StatusInternalServerError, errorResponse(err))
        return
    }

    // Parse the photo URL to extract the file name
    photoURL := photo.PhotoUrl
    fileName := parseFileNameFromURL(photoURL)

    // Connect to the SFTP server and attempt to delete the file
    client, err := getSFTPClient()
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, errorResponse(fmt.Errorf("failed to connect to SFTP server: %w", err)))
        return
    }
    defer client.Close()

    // Build the full file path on the SFTP server
    filePath := fmt.Sprintf("/kunden/pages/02/fb/d0016960/home/htdocs/uploads/%s", fileName)

    // Attempt to delete the file from the SFTP server
    err = client.Remove(filePath)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, errorResponse(fmt.Errorf("failed to delete file from SFTP server: %w", err)))
        return
    }

    // After successfully deleting the file, proceed to delete the record from the database
    err = server.store.DeleteServicePhoto(ctx, id)
    if err != nil {
        if err == sql.ErrNoRows {
            ctx.JSON(http.StatusNotFound, errorResponse(err))
            return
        }
        ctx.JSON(http.StatusInternalServerError, errorResponse(err))
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "service photo deleted successfully"})
}

// Helper function to extract the file name from the photo URL
func parseFileNameFromURL(url string) string {
    // Assuming the URL format is: https://<sftpHost>/uploads/<filename>
    parts := strings.Split(url, "/")
    if len(parts) > 0 {
        return parts[len(parts)-1]
    }
    return ""
}


const (
	sftpHost = "h3067231.stratoserver.net"
	sftpPort = "22"
	sftpUser = "u3067231"
	sftpPass = "oWd23-9!!fg_z"
	sftDomain = "buildeo.de"
)

// SFTP client setup function
func getSFTPClient() (*sftp.Client, error) {
	config := &ssh.ClientConfig{
		User: sftpUser,
		Auth: []ssh.AuthMethod{
			ssh.Password(sftpPass),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
	}

	log.Println("Dialing SFTP server...")

	conn, err := ssh.Dial("tcp", fmt.Sprintf("%s:%s", sftpHost, sftpPort), config)
	if err != nil {
		log.Printf("Failed to dial SFTP server: %v\n", err)
		return nil, fmt.Errorf("failed to dial: %v", err)
	}

	log.Println("Successfully connected to SFTP server.")

	client, err := sftp.NewClient(conn)
	if err != nil {
		log.Printf("Failed to create SFTP client: %v\n", err)
		return nil, fmt.Errorf("failed to create sftp client: %v", err)
	}

	return client, nil
}


// Function to extract the first word of the filename (before any spaces or special characters)
func getFirstWord(filename string) string {
    // Split the filename by spaces or special characters like underscores
    // Here, we split by space, but you can modify this to handle other characters if needed
    firstWord := strings.Split(filename, " ")[0]

    // If the filename contains extensions like .jpg or .png, preserve the extension
    ext := filepath.Ext(filename)
    if ext != "" {
        firstWord = strings.TrimSuffix(firstWord, ext)
    }

    return firstWord + ext // Return the first word with the file extension
}