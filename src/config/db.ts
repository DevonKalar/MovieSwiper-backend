import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
    throw new Error("DATABASE_URL is not set in environment variables");
}

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movieswiper_app',
    password: 'Icefire2435!^',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});