import * as db from "../db/index.js";

/**
 * Attempt to connect to the PostgreSQL database.
 */
async function testConnection() {
    try {
        const res = await db.query("SELECT NOW()");
        console.log("Connected to PostgreSQL database.  Server time is:", res.rows[0].now);
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

testConnection();
