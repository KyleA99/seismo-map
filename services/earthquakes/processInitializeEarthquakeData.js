import { query } from "../../db/index.js";
import { fetchEarthquakeData } from "./queryEarthquakeData.js";
import { InsertDbError } from "../../errors/InsertDbError.js"

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
            ) VALUES ${fetchedData.map((earthquakeEvent, index) => {
                const baseIndex = index * 8;

                return `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5}, $${baseIndex + 6}, $${baseIndex + 7}, $${baseIndex + 8})`;
            }).join(', ')}
            ON CONFLICT (earthquake_id) DO NOTHING;
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
        const res = await query(insertQuery);

        const successfulResponse = {
            "message": "Insert successful",
            "insertedRowCount": res.rowCount
        };

        return successfulResponse;
    } catch (error) {
        console.error("Error inserting earthquake data:", error.message);

        throw new InsertDbError(
            "Failed to insert USGS data into table.",
            error
        );
    }
}
