import {db} from '../database.js';

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

            const result = await conn.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);

            res.end(JSON.stringify({success: true, userId: result.insertId}));
            conn.release();
        }
        catch {
            res.writeHead(500, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({success: false, error: 'Internal Server Error'}));
            return;
        }
    });


}