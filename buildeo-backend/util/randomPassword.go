package util

import (
	"fmt"
	"math/rand"
	"time"
)

// Function to generate a random 6-digit token
func generateRandomToken() string {
	// Seed the random number generator
	rand.Seed(time.Now().UnixNano())

	// Generate a random 6-digit number
	token := rand.Intn(900000) + 100000 // Ensures it's a 6-digit number (between 100000 and 999999)

	// Return as a string
	return fmt.Sprintf("%d", token)
}