import fetch from 'node-fetch';

/**
 * Queries earthquake data from the USGS endpoint and returns select properties.
 * @param {Object} params - The query parameters to filter the earthquake data.
 * @returns {Array} Transformed/filtered earthquake data.
 */
export async function fetchEarthquakeData(params = {}) {
    try {
        const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query";

        // Base URL with appended static query parameters
        let queryString = `${baseUrl}?format=geojson&eventtype=earthquake`

        // Append optional query params
        Object.keys(params).forEach(key => {
            if (params[key]) {
                queryString += `&${key}=${params[key]}`;
            }
        });

        const response = await fetch(queryString);
        const data = await response.json();

        // Filter for specified properties
        const transformedData = data.features.map(feature => ({
            id: feature.id,
            magnitude: feature.properties.mag,
            location: feature.properties.place,
            depth: feature.geometry.coordinates[2],
            time: new Date(feature.properties.time).toISOString()
        }));

        return transformedData;
    } catch (error) {
        console.error("Error fetching earthquake data:", error.message);
        throw error;
    }
}
