export async function register(username, email, password) {
    try {
        const response = await fetch(`${process.env.BACKEND_ADDR}/api/register-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });
        const data = await response.json();
    }
    catch (error) {
        console.error('Error registrating user: '. error.message);
    }

}