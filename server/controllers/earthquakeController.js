import fetchEarthquakeData from '../services/queryEarthquakeData.js';

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
