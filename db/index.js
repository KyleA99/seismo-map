import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
});

pool.on('error', (error) => {
    console.error('Unexpected PostgreSQL error:', error);
    process.exit(-1);
});



// Construct query helper/utility function
export const query = (text, params) => {
    return pool.query(text, params)
};
