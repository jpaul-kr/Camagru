import jwt from 'jsonwebtoken';
import { getSecret } from './getSecret.js';
import { getDbData, updateDbData } from './database.js';

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

    console.log('accessToken: ' + token);
    if (!token) {
        //res.writeHead(401);
        res.end(JSON.stringify({success: false, message: "Unauthorized"}));
        return null;
    }

    try {
        const decoded = jwt.verify(token, await getSecret('access_token_cookie', 'access-token-cookie'));
        res.end(JSON.stringify({success: true, user: decoded}));
    } catch {
        //res.writeHead(401);
        res.end(JSON.stringify({success: false, message: "Unauthorized"}));
        return null;
    }
}

export async function refreshCookie(req, res) {
    const cookies = cookieParser(req);
    const token = cookies.refreshToken;
    
    try {
        console.log('refreshToken1: ' + token);
        if (!token) {
            //res.writeHead(401);
            res.end(JSON.stringify({success: false, message: "Unauthorized"}));
            return null;
        }
        const tokenContent = await getDbData('refresh_tokens', 'token', token);
        //console.log('tokenContent username: ' + tokenContent.username);
        const tokens = await createCookie(tokenContent.username);
        
        //console.log('refreshToken2: ' + tokens.refreshToken);
        res.setHeader('Set-Cookie', [
            `accessToken=${tokens.accessToken}; HttpOnly; Secure; Path=/; SameSite=Strict`,
            `refreshToken=${tokens.refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict`]);

        await updateDbData('refresh_tokens', tokenContent.username, 'token', tokens.refreshToken);
        res.end(JSON.stringify({success: true, message: 'ok'}));
    }
    catch (error) {
        res.end(JSON.stringify({success: false, message: "Unauthorized"}));
        return null;
    }
}

export async function createCookie(username) {
    const accessTokenCookie = await getSecret('access_token_cookie', 'access-token-cookie');
    const refreshTokenCookie = await getSecret('refresh_token_cookie', 'refresh-token-cookie');

    const accessToken = jwt.sign(
        {username},
        accessTokenCookie,
        {expiresIn: "15m"}
    );

    const refreshToken = jwt.sign(
        {username},
        refreshTokenCookie,
        {expiresIn: "7d"}
    );
    
    return {refreshToken, accessToken};
}