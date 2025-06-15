import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export default {
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  direction: 'up',
  database: {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
  }
};
