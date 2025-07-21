import { fetchEarthquakeData } from "./queryEarthquakeData.js";
import * as db from "../../db/index.js";

/**
 * Inserts the queried USGS earthquakes data into the earthquakes table.
 *
 * @param {import("express").Request} req - The request object.
 * @return {Promise<object>} successfulResponse - Successful message and the count of the inserted rows.
 */
export async function postUSGSData(req,) {
    const params = req.body;
    const fetchedData = await fetchEarthquakeData(params);

    const insertQuery = {
        text: `
            INSERT INTO earthquakes (
            earthquake_id,
            longitude,
            latitude,
            magnitude,
            location,
            depth,
            time,
            raw_data
            ) VALUES ${fetchedData.map((_, i) => {
            const baseIndex = i * 8;

            return `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5}, $${baseIndex + 6}, $${baseIndex + 7}, $${baseIndex + 8})`;
            }).join(', ')}
        `,
        values: fetchedData.flatMap(record => [
            record.earthquake_id,
            record.longitude,
            record.latitude,
            record.magnitude,
            record.location,
            record.depth,
            record.time,
            record.rawData
        ])
    };

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
