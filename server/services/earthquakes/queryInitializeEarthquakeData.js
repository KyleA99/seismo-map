import { fetchEarthquakeData } from './queryEarthquakeData.js';

/**
 * Queries select data based off a user's latitude/longitude and a radius of interest.
 * @param {Object} req - An HTTP request instance.
 * @returns {Object} - Filtered earthquake data for use in webpage initialization.
 */
export async function queryInitializeEarthquakeData(req) {
    const params = req.query;

    const data = fetchEarthquakeData(params);

    return data;
}
