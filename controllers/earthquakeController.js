import { fetchEarthquakeData } from "../services/earthquakes/queryEarthquakeData.js";
import { postUSGSData, queryInitializedEarthquakeData } from "../services/earthquakes/processInitializeEarthquakeData.js";

/**
 * Handles a GET request to fetch USGS earthquake data.
 *
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 */
export async function getLiveEarthquakeData(req, res) {
    const params = req.query;

    try {
        const data = await fetchEarthquakeData(params);
        res.json({ success: true, data });
    } catch (error) {
        console.error("Controller caught error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
            errorCode: error.errorCode || "INTERNAL_ERROR",
        });
    }
}



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

        return res.status(991).json({
            error: "Failed to post earthquake data.",
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

        return res.status(990).json({
            error: "Failed to fetch earthquake data.",
            details: error.message
        });
    }
}
