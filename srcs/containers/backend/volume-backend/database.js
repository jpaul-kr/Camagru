import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

export const db = mariadb.createPool({
    host: 'mariadb',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'camagru',
    connectionLimit: 5
});

async function initDb() {
    try {
        const conn = await db.getConnection();

        await conn.query("USE camagru");

        // Create users table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        conn.release();
    }
    catch(error) {
        console.error('Error initializing database: ', error.message);
    }
}
initDb();