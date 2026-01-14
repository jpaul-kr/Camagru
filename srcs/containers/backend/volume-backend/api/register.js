import {db} from '../database.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import {sendEmail} from './sendEmail.js';

async function isValidEmail(email, conn) {
    try{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Email regex validation failed for: ' + email);
            return false;
        }

        
        const rows = await conn.query('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email]);
        const result = Number(rows[0].count);  // Convert bigint to number
        console.log('count email: ' + result + ', type: ' + typeof result);
        const isValid = result === 0;
        console.log('isValid (email): ' + isValid);
        return isValid;
    }
    catch (error) {
        console.error('Error validating email: ', error.message, error.stack);
    }
    return false;
}

async function isValidUsername(username, conn) {
    try{
        const rows = await conn.query('SELECT COUNT(*) AS count FROM users WHERE username = ?', [username]);
        const result = Number(rows[0].count);  // Convert bigint to number
        console.log('count username: ' + result + ', type: ' + typeof result);
        const isValid = result === 0;
        console.log('isValid (username): ' + isValid);
        return isValid;
    }
    catch (error) {
        console.error('Error validating username: ', error.message, error.stack);
    }
    return false;
}

export async function checkUserData(req, res) {
    let body = '';
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", async () => {
        req.body = JSON.parse(body);
        
        const {username, email, password} = req.body;
        try {
            const conn = await db.getConnection();
            const hashPassword = bcrypt.hashSync(password, 12);
            
            const validUsername = await isValidUsername(username, conn);
            console.log('validUsername: ' + validUsername);
            if (validUsername === false)
            {
                console.log('llega1');
                /*res.writeHead(400, {
                    'Content-Type': 'application/json',
                });*/
                res.end(JSON.stringify({success: false, error: 'Username already exists'}));
                return;
            }
            const validEmail = await isValidEmail(email, conn);
            console.log('validEmail: ' + validEmail);
            if (validEmail === false)
            {
                console.log('llega2');
                /*res.writeHead(400, {
                    'Content-Type': 'application/json',
                });*/
                res.end(JSON.stringify({success: false, error: 'Email already exists or is invalid'}));
                return;
            }
            const token = crypto.randomUUID();
            console.log('token: ' + token);
            sendEmail(email, token);
            const result = await conn.query('INSERT INTO pending_users (username, email, password, token) VALUES (?, ?, ?, ?)', [username, email, hashPassword, token]);

            conn.release();
            res.end(JSON.stringify({success: true}));
        }
        catch (error) {
            res.writeHead(500, {
                'Content-Type': 'application/json',
            });
            //console.error('Error registrating user: ', error.message);
            res.end(JSON.stringify({success: false, error: error.message}));
            return;
        }
    });
}

export async function registerUser(req, res) {
    try {
        console.log('registerUser called');
        const conn = await db.getConnection();
        const token = new URL(req.url, `http://${req.headers.host}`).searchParams.get('token');

        const rows = await conn.query('SELECT * FROM pending_users WHERE token = ?', [token]);
        if (rows.length === 0) {
            res.writeHead(400, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({success: false, error: 'Invalid or expired token'}));
            return;
        }
        const user = rows[0];
        await conn.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [user.username, user.email, user.password]);
        await conn.query('DELETE FROM pending_users WHERE token = ?', [token]);
        conn.release();
        res.writeHead(302, {
            Location: "http://localhost:8443?confirmed=true"
        });
        res.end(JSON.stringify({success: true}));
    }
    catch (error) {
        res.writeHead(500, {
            'Content-Type': 'application/json',
        });
        //console.error('Error registrating user: ', error.message);
        res.end(JSON.stringify({success: false, error: error.message}));
        return;
    }
}
