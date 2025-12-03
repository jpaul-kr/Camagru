import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function getSecret(apiUrl, key) {

    try {
        const res = await axios.get(`http://vault:8200/v1/Camagru/${apiUrl}`, {
            headers: {
                'X-Vault-Token': process.env.VAULT_TOKEN_ID,
            }
        });
        const data = res.data;
        return JSON.stringify(data.data[key]);
    }
    catch (error) {
        console.error('Error fetching secret: ', error.message);
        //throw error;
    }
}