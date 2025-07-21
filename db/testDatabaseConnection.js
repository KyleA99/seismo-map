import { query } from "../db/index.js";

/**
 * Attempt to connect to the PostgreSQL database.
 */
async function testConnection() {
    try {
        const res = await query("SELECT NOW()");
        console.log("Connected to PostgreSQL database.");
    } catch (error) {
        console.error("Connection failed:", error);

        return { success: false, error: error.message };
    }
}

testConnection();
