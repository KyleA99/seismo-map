import fetch from 'node-fetch';

/**
 * Queries earthquake data from the USGS endpoint and transforms it from geojson to json.
 * @param {Object} params - The query parameters to filter the earthquake data.
 * @returns {Array} Transformed earthquake data with specific properties.
 */
async function fetchEarthquakeData(params = {}) {
    try {
        const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query";

        // Base URL with appended static query parameters
        let queryString = `${baseUrl}?format=geojson&eventtype=earthquake`

        // Add filters to the query string based on query parameters
        if (params.starttime) {
            queryString += `&starttime=${params.starttime}`;
        }
        if (params.endtime) {
            queryString += `&endtime=${params.endtime}`;
        }
        if (params.latitude && params.longitude) {
            queryString += `&latitude=${params.latitude}&longitude=${params.longitude}`;
        }
        if (params.maxradiuskm) {
            queryString += `&maxradiuskm=${params.maxradiuskm}`;
        }
        if (params.minmagnitude) {
            queryString += `&minmagnitude=${params.minmagnitude}`;
        }
        if (params.maxmagnitude) {
            queryString += `&maxmagnitude=${params.maxmagnitude}`;
        }
        if (params.limit) {
            queryString += `&limit=${params.limit}`;
        }
        if (params.orderby) {
            queryString += `&orderby=${params.orderby}`;
        }

        const response = await fetch(queryString);
        const data = await response.json();

        // Transform the data to match the swagger schema
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

export default fetchEarthquakeData;
