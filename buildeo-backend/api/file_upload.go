package api

import (
	"fmt"
	"io"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/pkg/sftp"
	"golang.org/x/crypto/ssh"
)

// Constants for SFTP configuration
const (
	sftpHost     = "h3067231.stratoserver.net"
	sftpPort     = "22"
	sftpUser     = "u3067231"
	sftpPass     = "oWd23-9!!fg_z"
	sftpDomain   = "buildeo.de"
	photoDir     = "/kunden/pages/02/fb/d0016960/home/htdocs/uploads/photos"
	quotationDir = "/kunden/pages/02/fb/d0016960/home/htdocs/uploads/quotations"
)

// uploadFile uploads a file to the SFTP server and returns its URL
func uploadFile(ctx *gin.Context, uploadDir string, formData string) (string, error) {
	file, header, err := ctx.Request.FormFile(formData)
	if err != nil {
		return "", fmt.Errorf("error reading file: %w", err)
	}
	defer file.Close()

	fmt.Printf("Attempting to connect to SFTP server...\n")
	client, err := getSFTPClient()
	if err != nil {
		fmt.Printf("Failed to connect to SFTP server: %v\n", err)
		return "", fmt.Errorf("failed to connect to SFTP server: %w", err)
	}
	defer client.Close()

	fmt.Printf("Checking directory existence: %s\n", uploadDir)
	if _, err := client.Stat(uploadDir); err != nil {
		fmt.Printf("Directory does not exist, creating: %s\n", uploadDir)
		if err := client.Mkdir(uploadDir); err != nil {
			fmt.Printf("Failed to create directory: %v\n", err)
			return "", fmt.Errorf("failed to create directory: %w", err)
		}
	}

	fileName := fmt.Sprintf("%d-%s", time.Now().Unix(), getFirstWord(header.Filename))
	dstPath := fmt.Sprintf("%s/%s", uploadDir, fileName)
	dstFile, err := client.Create(dstPath)
	if err != nil {
		return "", fmt.Errorf("failed to create file on SFTP server: %w", err)
	}
	defer dstFile.Close()

	if _, err := io.Copy(dstFile, file); err != nil {
		return "", fmt.Errorf("failed to upload file: %w", err)
	}

	// Return the file URL
	fileURL := fmt.Sprintf("https://%s/uploads/%s", sftpDomain, fileName)
	fmt.Printf("File uploaded successfully. File URL: %s\n", fileURL)

	return fileURL, nil
}

// uploadFile uploads a file to the SFTP server and returns its URL
func uploadFileQuotation(ctx *gin.Context, uploadDir string, formData string) (string, error) {
	file, header, err := ctx.Request.FormFile(formData)
	if err != nil {
		return "", fmt.Errorf("error reading file: %w", err)
	}
	defer file.Close()

	// Validate file size
	if header.Size < 1024 { // 1 KB minimum
		return "", fmt.Errorf("file is too small or possibly empty")
	}

	fmt.Printf("Attempting to connect to SFTP server...\n")
	client, err := getSFTPClient()
	if err != nil {
		fmt.Printf("Failed to connect to SFTP server: %v\n", err)
		return "", fmt.Errorf("failed to connect to SFTP server: %w", err)
	}
	defer client.Close()

	fmt.Printf("Checking directory existence: %s\n", uploadDir)
	if _, err := client.Stat(uploadDir); err != nil {
		fmt.Printf("Directory does not exist, creating: %s\n", uploadDir)
		if err := client.Mkdir(uploadDir); err != nil {
			fmt.Printf("Failed to create directory: %v\n", err)
			return "", fmt.Errorf("failed to create directory: %w", err)
		}
	}

	// Generate unique file name
	fileName := fmt.Sprintf("%d-%s", time.Now().Unix(), getFirstWord(header.Filename))
	dstPath := fmt.Sprintf("%s/%s", uploadDir, fileName)
	fmt.Println("filename : " + fileName)

	dstFile, err := client.Create(dstPath)
	if err != nil {
		return "", fmt.Errorf("failed to create file on SFTP server: %w", err)
	}
	defer dstFile.Close()

	// Upload file
	bytesCopied, err := io.Copy(dstFile, file)
	if err != nil {
		return "", fmt.Errorf("failed to upload file: %w", err)
	}

	// Check if uploaded file size matches expected size
	if bytesCopied != header.Size {
		return "", fmt.Errorf("uploaded file size mismatch: copied %d bytes, expected %d bytes", bytesCopied, header.Size)
	}

	fmt.Printf("Uploaded %d bytes. Original size: %d bytes\n", bytesCopied, header.Size)

	// Ensure correct permissions
	if err := client.Chmod(dstPath, 0644); err != nil {
		return "", fmt.Errorf("failed to set file permissions: %w", err)
	}

	fileURL := fmt.Sprintf("https://%s/uploads/quotations/%s", sftpDomain, fileName)
	fmt.Printf("File uploaded successfully. File URL: %s\n", fileURL)

	return fileURL, nil
}

// deleteUploadedFile deletes a file from the SFTP server
func deleteUploadedFile(fileURL string) error {
	client, err := getSFTPClient()
	if err != nil {
		return fmt.Errorf("failed to connect to SFTP server: %w", err)
	}
	defer client.Close()

	fileName := parseFileNameFromURL(fileURL)
	filePath := fmt.Sprintf("/kunden/pages/02/fb/d0016960/home/htdocs/uploads/%s", fileName)
	if err := client.Remove(filePath); err != nil {
		return fmt.Errorf("failed to delete file: %w", err)
	}

	return nil
}

// getSFTPClient establishes an SFTP connection and returns the client
func getSFTPClient() (*sftp.Client, error) {
	config := &ssh.ClientConfig{
		User:            sftpUser,
		Auth:            []ssh.AuthMethod{ssh.Password(sftpPass)},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
	}

	conn, err := ssh.Dial("tcp", fmt.Sprintf("%s:%s", sftpHost, sftpPort), config)
	if err != nil {
		return nil, fmt.Errorf("failed to dial SFTP server: %w", err)
	}

	client, err := sftp.NewClient(conn)
	if err != nil {
		return nil, fmt.Errorf("failed to create SFTP client: %w", err)
	}

	return client, nil
}

// parseFileNameFromURL extracts the file name from a URL
func parseFileNameFromURL(url string) string {
	parts := strings.Split(url, "/")
	if len(parts) > 0 {
		return parts[len(parts)-1]
	}
	return ""
}

// getFirstWord extracts the first word of a filename and preserves the extension
func getFirstWord(filename string) string {
	firstWord := strings.Split(filename, " ")[0]
	ext := filepath.Ext(filename)
	return strings.TrimSuffix(firstWord, ext) + ext
}
