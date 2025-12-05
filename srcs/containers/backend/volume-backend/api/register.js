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

            console.log('llega1');
            conn.release();
            console.log('llega2');
            res.end(JSON.stringify({success: true, userId: result.insertId}));
            console.log('llega3');
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