import { fetchEarthquakeData } from '../services/queryEarthquakeData.js';

/**
 * Queries select data based off a user's latitude/longitude and a radius of interest.
 * @returns {Object} Filtered earthquake data for use in webpage initialization.
 */
export async function queryInitializeEarthquakeData() {
    const params = {
        "latitude": req.latitude,
        "longitude": req.longitude,
        "maxRadius": req.maxRadius,
        "limit": req.limit,
        "orderby": req.orderby,
    }

    const data = fetchEarthquakeData(params);

    return data;
}
