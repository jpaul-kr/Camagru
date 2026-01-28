import mariadb from 'mariadb';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { error } from 'console';
//import { checkData } from '../../frontend/volume-frontend/pages/login/register';

dotenv.config();

export const db = mariadb.createPool({
    host: 'mariadb',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'camagru',
    connectionLimit: 5
});

export async function checkDbData(table, key, value) {
    const conn = await db.getConnection();

    const rows = await conn.query('SELECT COUNT(*) AS count FROM ? WHERE ? = ?', [table], [key], [value]);
    const result = Number(rows[0].count);  // Convert bigint to number
    return (result == 0 ? false : true);
}

export async function addToPendingUsers(username, email, password, token) {
    try {
        const conn = await db.getConnection();
        const hashPassword = await bcrypt.hash(password, 12);
        await conn.query(`INSERT INTO pending_users (username, email, password, token) VALUES (?, ?, ?, ?)`, [username, email, hashPassword, token]);
        conn.release();
    }
    catch(error) {
        console.log('error trying to add to pending_users: ', error.message)
    }
}

export async function addToChangePassword(email, token) {
    try {
        const conn = await db.getConnection();
        await conn.query(`INSERT INTO change_password (email, token) VALUES (?, ?)`, [email, token]);
    } 
    catch(error) {
        console.log('error adding email or token to change password: ', error.message)
    }
}

export async function changeUserPassword(email, password) {
    try {
        const conn = await db.getConnection();
        const rows = await conn.query(`SELECT * from users WHERE email = ?`, [email]);
        if (rows.length === 0) {
            conn.release();
            res.writeHead(404);
            return res.end(JSON.stringify({success: false, message: 'User not found'}));
        }

        const oldPassword = rows[0].password;
        const match = await bcrypt.compare(oldPassword, password);
        if (!match) {
            conn.release();
            res.writeHead(401);
            return res.end(JSON.stringify({success: false, message: 'Invalid password'}));
        }
        await conn.query(`UPDATE users SET password = ? WHERE email = ?`, [password, email]);
        conn.release();
        res.end(JSON.stringify({success: true}));
    }
    catch (error) {
        console.log("error trying to change password: " + error.message);
    }
}

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

        await conn.query(`
            CREATE TABLE IF NOT EXISTS pending_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                token VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`);

        await conn.query(`
            CREATE TABLE IF NOT EXISTS change_password (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL UNIQUE,
                token VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`);

        conn.release();
    }
    catch(error) {
        console.error('Error initializing database: ', error.message);
    }
}
initDb();