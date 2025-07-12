import { fetchEarthquakeData } from "./queryEarthquakeData.js";
import * as db from "../../db/index.js";

/**
 * Queries select data based off a user's latitude/longitude and a radius of interest.
 *
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @returns {Promise<object>} Filtered earthquake data for use in webpage initialization.
 */
async function queryUsgsEarthquakeData(req, res) {
    // pass in lat/long from browser client, for past 30 days, within 5000 km
        // or have a massive query to init db and just have the radius display a subset - this will have slower init/page load but presumably faster queries from db during continued use
    const params = req.query;

    try {
        const data = fetchEarthquakeData(params);

        return data;
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
        res.status(600).json({
            error: "Failed to fetch user's local earthquake data",
            details: error.message
        });
    }
}



/**
 * Inserts the queried USGS earthquakes data into the earthquakes table.
 *
 * @param {import("express").Request} req - The request object.
 * @return {Promise<object>} successfulResponse - Successful message and the count of the inserted rows.
 */
export async function postUSGSData(req) {
    const parsedData = processBulkData(req);

    const insertQuery = {
        text: `
            INSERT INTO earthquakes (
                earthquake_id,
                latitude,
                longitude,
                magnitude,
                location,
                depth,
                time,
                raw_data
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8
            )
        `,
        values:
        [
            "f",
            80.0,
            90.0,
            4.5,
            "test",
            1.0,
            "2025-01-01T00:00:00Z",
            {
                "id": "d",
                "magnitude": 0,
                "location": "string",
                "depth": 0,
                "time": "2025-07-09T05:10:24.734Z"
            }
        ]
    };

        // values:
        // [
        //     parsedData.id,
        //     parsedData.latitude,
        //     parsedData.longitude,
        //     parsedData.magnitude,
        //     parsedData.location,
        //     parsedData.depth,
        //     parsedData.time,
        //     parsedData.rawData
        // ]
    try {
        const res = await db.query(insertQuery);

        const successfulResponse = {
            "message": "Insert successful",
            "insertedRowCount": res.rowCount
        };

        return successfulResponse;
    } catch (error) {
        console.error("Error inserting earthquake data:", error.message);
        throw error;
    }
}
