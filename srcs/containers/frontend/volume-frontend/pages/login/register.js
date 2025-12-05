export async function register(username, email, password) {
    try {
        const response = await fetch(`http://localhost:8443/backend/register-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });
        const data = await response.json();
    }
    catch (error) {
        console.error('Error registrating user: ', error.message);
    }

}