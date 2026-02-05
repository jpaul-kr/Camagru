import {db, changeUserPassword} from '../database.js';

export async function resetPassword(req, res) {
    let body = '';
    console.log('llega reset_password');
    req.on('data', chunk =>{
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            req.body = JSON.parse(body);
            const {newPassword, token} = req.body;
            const conn = await db.getConnection();

            const rows = await conn.query(`SELECT * from change_password WHERE token = ?`, [token]);
            if (rows.length === 0) {
                res.writeHead(400, {
                    'Content-Type': 'application/json',
                });
                res.end(JSON.stringify({success: false, error: 'Invalid or expired token'}));
                return;
            }

            const email = rows[0].email;
            console.log('email: ' + email + ' password: ' + newPassword);
            //const hashPassword = newPassword;

            const result = await changeUserPassword(email, newPassword);
            conn.release();
            res.end(JSON.stringify({success: result.success, message: result.message}));
        }
        catch (error) {
            console.log('error trying to reset your password: ' + error.message);
            res.end(JSON.stringify({success: false}));
        } 
    });
}