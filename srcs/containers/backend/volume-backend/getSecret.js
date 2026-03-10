import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchSecret(req, res) {
    console.log('enters fetchSecret');
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });
    console.log('Received request to fetch secret: ', body);
    req.on('end', async () => {
        req.body = JSON.parse(body);
        const {apiUrl, key} = req.body;
        
        try {
            console.log(`Fetching secret for apiUrl: ${apiUrl} and key: ${key}`);
            const result = await getSecret(apiUrl, key);
            console.log('Fetched secret: ', result);
            res.end(JSON.stringify(result));
        } catch (error) {
            console.error('Error in fetchSecret handler: ', error.message);
            res.end('Internal Server Error');
        }
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