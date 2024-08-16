package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

// Define a struct to map the response data
type DogImage struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func main() {
	// Define the API endpoint
	apiURL := ""

	// Make the HTTP request
	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		log.Fatalf("Failed to make request: %v", err)
	}

	req.Header.Set("accept", "application/vnd.linkedin.normalized+json+2.1")
	req.Header.Set("Referer", "https://www.linkedin.com/jobs/")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

	// Create an HTTP client
	client := &http.Client{}

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Error sending request: %v", err)
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		log.Fatalf("Request failed with status: %s", resp.Status)
	}

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}

	// Print the response body
	fmt.Println(string(body))
}
