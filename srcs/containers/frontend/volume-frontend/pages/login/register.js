export async function checkData(username, email, password) {
    try {
        const response = await fetch(`http://localhost:8443/backend/check-user-data`, {
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

export async function sendConfirmationEmail(email) {
    try {
        const response = await fetch(`http://localhost:8443/backend/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
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
        const response = await fetch(`http://localhost:8443/backend/register-user`, {
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