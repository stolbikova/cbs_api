package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"io/ioutil"
)

// Define a struct to map the response data from the API
type PopulationData struct {
	ID       string `json:"ID"`
	Period   string `json:"Perioden"`
	Population int    `json:"Bevolking"`
}

func main() {
	// Define the CBS API endpoint
	apiURL := "https://opendata.cbs.nl/ODataApi/odata/37325eng/TypedDataSet"

	// Make the HTTP request
	resp, err := http.Get(apiURL)
	if err != nil {
		log.Fatalf("Failed to make request: %v", err)
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Failed to read response body: %v", err)
	}

	// Parse the JSON response
	var result struct {
		Value []PopulationData `json:"value"`
	}
	if err := json.Unmarshal(body, &result); err != nil {
		log.Fatalf("Failed to parse JSON: %v", err)
	}

	// Print the first few entries as an example
	for i, data := range result.Value {
		fmt.Printf("Entry %d: Year: %s, Population: %d\n", i+1, data.Period, data.Population)
		if i == 9 {
			break // Limit output to the first 10 entries
		}
	}
}
