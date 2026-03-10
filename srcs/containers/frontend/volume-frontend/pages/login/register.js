import { getSecret } from "../../getSecret.js";

const SERVER_ADDR = await getSecret('server_addr', 'server-addr');

export async function checkData(username, email, password) {
    try {
        const response = await fetch(`${SERVER_ADDR}/backend/check-user-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error registrating user: ', error.message);
    }
}

export async function sendConfirmationEmail(username, email, password) {
    try {
        const response = await fetch(`${SERVER_ADDR}/backend/send-confirmation-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error sending confirmation email: ', error.message);
    }
}

export async function registerUser(username, email, password) {
    try {
        const response = await fetch(`${SERVER_ADDR}/backend/register-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error registrating user: ', error.message);
    }
}