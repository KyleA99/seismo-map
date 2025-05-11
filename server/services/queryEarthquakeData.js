import fetch from 'node-fetch';

/**
 * Queries earthquake data from the USGS endpoint and transforms it from geojson to json.
 * @returns {Array} Transformed earthquake data with specific properties.
 */
async function fetchEarthquakeData() {
    try {
        const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake";

        const response = await fetch(baseUrl);
        const data = await response.json();

        // Transform the data to match the swagger schema
        const transformedData = data.features.map(feature => ({
            id: feature.id,
            magnitude: feature.properties.mag,
            location: feature.properties.place,
            depth: feature.geometry.coordinates[2],
            time: new Date(feature.properties.time).toISOString()

            // we want other properties too: maxradius (or maxradiuskm), maxdepth, minmagnitude, maxmagnitude, orderby...
        }));

        return transformedData;
    } catch (error) {
        console.error("Error fetching earthquake data:", error.message);
        throw error;
    }
}

export default fetchEarthquakeData;
