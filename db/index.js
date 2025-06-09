import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL error:', err);
  process.exit(-1);
});



/**
 * Testing/debugging function for confirming we can successfully connect to the PostgreSQL db.
 */
async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connected to PostgreSQL database.  Server time is:', res.rows[0].now);
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();



// Construct query helper
// export const query = (text, params) => {
//     return pool.query(text, params)
// };
