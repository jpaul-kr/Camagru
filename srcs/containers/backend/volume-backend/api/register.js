import {db} from '../database.js';
import bcrypt from 'bcryptjs';

async function isValidEmail(email, conn) {
    try{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return false;

        const rows = await conn.query('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email]);
        console.log('count email: ' + rows[0].count);
        return (rows[0].count == 0 ? true : false);
    }
    catch (error) {
        console.error('Error validating email: ', error.message);
    }
    return false;
}

async function isValidUsername(username, conn) {
    try{
        const rows = await conn.query('SELECT COUNT(*) AS count FROM users WHERE username = ?', [username]);
        console.log('count username: ' + rows[0].count);
        return (rows[0].count == 0 ? true : false);
    }
    catch (error) {
        console.error('Error validating username: ', error.message);
    }
    return false;
}

export async function registerUser(req, res) {
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
                res.writeHead(400, {
                    'Content-Type': 'application/json',
                });
                res.end(JSON.stringify({success: false, error: 'Username already exists'}));
                return;
            }
            const validEmail = await isValidEmail(email, conn);
            console.log('validEmail: ' + validEmail);
            if (validEmail === false)
            {
                console.log('llega2');
                res.writeHead(400, {
                    'Content-Type': 'application/json',
                });
                res.end(JSON.stringify({success: false, error: 'Email already exists or is invalid'}));
                return;
            }
            const result = await conn.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashPassword]);

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
