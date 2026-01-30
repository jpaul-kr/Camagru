import {checkDbData} from '../database.js';

export async function checkEmail(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        req.body = JSON.parse(body);
        const {email} = req.body;

        try {
            const result = await checkDbData('users' ,'email', email);
            console.log('checkDbData result: ' + result);
            res.end(JSON.stringify({result: result}));
        }
        catch (error) {
            console.log('error checking email: ' + error.message);
        }
    });
}