import * as mariadb from 'mariadb';
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
    try {
        const conn = await db.getConnection();

        const rows = await conn.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${key} = ?`, [value]);
        conn.release();
        const result = Number(rows[0].count);  // Convert bigint to number
        console.log('result: ' + result);
        return (result == 0 ? false : true);
    }
    catch(error) {
        console.log(`error trying to find ${value} in ${table}: ${error.message}`);
    }
}

export async function getDbData(table, key, value) {
    try {
        const conn = await db.getConnection();
        const rows = await conn.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [value]);
        const user = rows[0];
        conn.release();
        if (user === undefined)
            return false;
        return user;
    }
    catch(error) {
        console.log(`error trying to get ${value} in ${table}: ${error.message}`);
    }

}

export async function addToPendingUsers(username, email, password, token) {
    try {
        const conn = await db.getConnection();
        const hashPassword = await bcrypt.hash(password, 12);
        //const hashPassword = password;
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
        console.log('entra a changeUserPassword');
        const conn = await db.getConnection();
        const rows = await conn.query(`SELECT * from users WHERE email = ?`, [email]);
        if (rows.length === 0) {
            conn.release();
            return {success: false, message: 'Could not find email'};
        }
        const oldPassword = rows[0].password;
        const match = await bcrypt.compare(password, oldPassword);
        console.log('match: ' + match);
        if (match) {
            conn.release();
            return {success: false, message: 'The password is the same as before'};
        }
        const hashPassword = await bcrypt.hashSync(password, 12);

        await conn.query(`UPDATE users SET password = ? WHERE email = ?`, [hashPassword, email]);
        await conn.query(`DELETE FROM change_password WHERE email = ?`, [email]);
        conn.release();
        return {success: true, message: 'Success!! You can now go back to login'};
    }
    catch (error) {
        console.log("error trying to change password: " + error.message);
        return {message: 'there has been an error trying to change your password :('}
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