import {checkDbData} from '../database.js';

export async function checkEmail(res, req) {
    let body = '';
    req.on('data', chunk  => {
        body += chunk;
    });
    req.on('end', async () => {
        req.body = JSON.parse(body);
        const {email} = req.body;

        try {
            const result = checkDbData('email', email);
            res.end(JSON.stringify({success: result}));
        }
        catch (error) {
            console.log('error checking email: ' + error.message);
        }
    });
}