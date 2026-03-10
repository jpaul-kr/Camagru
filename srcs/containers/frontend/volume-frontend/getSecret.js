export async function getSecret(apiUrl, key) {
    const res = await fetch(`https://localhost:8443/backend/fetch-secret`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({apiUrl, key}),
    });
    const data = await res.json();
    return data;
}