export async function resetPassword(req, res) {
    let body = '';
    req.on('data', chunk =>{
        body += chunk.toSring();
    });
    req.on('end', async () => {
        req.body = JSON.parse(body);
    });
}