import fetch from 'node-fetch';

/**
 * Queries earthquake data from the USGS endpoint.
 * @returns {Object} The earthquake data from the USGS API.
 */
async function fetchEarthquakeData() {
    try {
        const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake";

        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching earthquake data:", error.message);
        throw error;
    }
}

export default fetchEarthquakeData;
