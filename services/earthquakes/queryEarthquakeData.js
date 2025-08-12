import fetch from "node-fetch";
import { transformData } from "./transformData.js";
import { FetchDataError } from "../../errors/FetchDataError.js";

/**
 * Queries earthquake data from the USGS endpoint and returns select properties.
 *
 * @param {Object} params - The parameters to filter the earthquake data.
 * @returns {Promise<object>} - Transformed/filtered earthquake data.
 */
export async function fetchEarthquakeData(params = {}) {
    const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query";

    let queryString = `${baseUrl}?format=geojson&eventtype=earthquake`;

    // Append optional query params
    Object.keys(params).forEach(key => {
        if (params[key]) {
            queryString += `&${key}=${params[key]}`;
        }
    });

    try {
        const response = await fetch(queryString);
        const data = await response.json();
        const transformedData = transformData(data);

        return transformedData;
    } catch (error) {
        console.error("Error fetching USGS earthquake data:", error.message);

        throw new FetchDataError(
            "Failed to fetch earthquake data from USGS.",
            error
        );
    }
}
