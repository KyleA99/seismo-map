import { fetchEarthquakeData } from "../services/earthquakes/queryEarthquakeData.js";
import { postUSGSData, queryInitializedEarthquakeData } from "../services/earthquakes/processInitializeEarthquakeData.js";

/**
 * Handles a GET request to fetch USGS earthquake data.
 *
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 */
export async function getEarthquakeData(req, res) {
    const params = req.query;

    try {
        const data = await fetchEarthquakeData(params);
        res.json(data);
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        res.status(500).json({
            error: "Failed to fetch earthquake data",
            details: error.message
        });
    }
}



// this function can be deleted once the entire init logic is built
/**
 * Inserts earthquake data into the "earthquakes" table.
 *
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 */
export async function insertEarthquakeData(req, res) {
    try {
        const data = await postUSGSData(req);
        res.json(data);
    } catch (error) {
        console.error("Error posting earthquake data:", error);
        res.status(991).json({
            error: "Failed to post earthquake data",
            details: error.message
        });
    }
}



/**
 * Handles a GET request to fetch our init data.
 *
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 */
export async function queryInitData(req, res) {
    try {
        const data = await queryInitializedEarthquakeData(req);
        res.json(data);
    } catch (error) {
        console.error("Error fetching init data:", error);
        res.status(990).json({
            error: "Failed to fetch earthquake data",
            details: error.message
        });
    }
}
