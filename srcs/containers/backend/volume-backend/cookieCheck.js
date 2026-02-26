import jwt from 'jsonwebtoken';
import { getSecret } from './getSecret.js';

function cookieParser(req) {
    const list = {};
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader)
        return list;

    console.log('cookieHeader: ' + cookieHeader);

    cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        list[parts[0].trim()] = decodeURIComponent(parts[1]);
    });
    return list;
}

export async function authenticate(req, res) {
    const cookies = cookieParser(req);
    const token = cookies.accessToken;

    if (!token) {
        res.writeHead(401);
        res.end(JSON.stringify({success: false, message: "unauthorized"}));
        return null;
    }

    try {
        const decoded = jwt.verify(token, await getSecret('access_token_cookie', 'access-token-cookie'));
        res.end(JSON.stringify({success: true, user: decoded}));
    } catch {
        res.writeHead(401);
        res.end("Unauthorized");
        return null;
}
}