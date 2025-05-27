import { fetchEarthquakeData } from '../services/earthquakes/queryEarthquakeData.js';
import { queryInitializeEarthquakeData } from '../services/earthquakes/queryInitializeEarthquakeData.js';

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
