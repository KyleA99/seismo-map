import { fetchEarthquakeData } from '../services/earthquakes/queryEarthquakeData.js';
import { queryInitializeEarthquakeData } from '../services/earthquakes/queryInitializeEarthquakeData.js';

/**
 * Handles a GET request to fetch USGS earthquake data.
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export async function getEarthquakeData(req, res) {
    try {
        const params = req.query;
        const data = await fetchEarthquakeData(params);
        res.json(data);
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        res.status(500).json({
            error: 'Failed to fetch earthquake data',
            details: error.message
        });
    }
}



/**
 * Handles a GET request to fetch our init data.
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export async function queryInitData(req, res) {
    try {
        const data = await queryInitializeEarthquakeData(req);
        res.json(data);
    } catch (error) {
        console.error('Error fetching init data:', error);
        res.status(500).json({
            error: 'Failed to fetch earthquake data',
            details: error.message
        });
    }
}
