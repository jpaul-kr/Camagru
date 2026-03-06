import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchSecret(res, req) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        req.body = JSON.parse(body);
        const {apiUrl, key} = req.body;

        const result = await getSecret(apiUrl, key);
        res.end(JSON.stringify(result));
    });
}

export async function getSecret(apiUrl, key) {

    try {
        const res = await axios.get(`http://vault:8200/v1/Camagru/${apiUrl}`, {
            headers: {
                'X-Vault-Token': process.env.VAULT_TOKEN_ID,
            }
        });
        const data = res.data;
        return data.data[key];
    }
    catch (error) {
        console.error('Error fetching secret: ', error.message);
        //throw error;
    }
}