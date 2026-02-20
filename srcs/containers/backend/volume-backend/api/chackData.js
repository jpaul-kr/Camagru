import {checkDbData, getDbData} from '../database.js';
import bcrypt from 'bcryptjs';

export async function checkEmail(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        req.body = JSON.parse(body);
        const {email} = req.body;

        try {
            const result = await checkDbData('users' ,'email', email);
            console.log('checkDbData result: ' + result);
            res.end(JSON.stringify({result: result}));
        }
        catch (error) {
            console.log('error checking email: ' + error.message);
        }
    });
}

export async function checkLogin(req, res) {
    console.log('enters check login');
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try { 
            req.body = JSON.parse(body);
            const {pass, username} = req.body;

            const user = await getDbData('users', 'username', username);
            if (!user) {
                res.end(JSON.stringify({success: false, message: 'User not found.'}));
                return;
            }
            const isPasswordOk = await bcrypt.compare(pass, user.password);
            if (!isPasswordOk) {
                res.end(JSON.stringify({success: false, message: 'Incorrect password.'}));
                return;
            }
            res.end(JSON.stringify({success: true, message: 'ok'}));
        }
        catch (error) {
            console.log('error checking login: ' + error.message);
            res.end(JSON.stringify({success: false, message: 'Something went wrong'}));
        }
    });
}

export async function isValidPassword(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        req.body =  JSON.parse(body);
        const {pass1, pass2} = req.body;
        try {
            if (pass1 !== pass2)
                res.end(JSON.stringify({success: false, message: 'Passwords do not match.'}));
            else if (pass1.length < 8)
                res.end(JSON.stringify({success: false, message: 'Password has to be minimum 8 characters long.'}));
            else if (pass1.includes(" ") || pass1.includes('/t') || pass1.includes('/v'))
                res.end(JSON.stringify({success: false, message: 'Password cannot have spaces or tabs.'}));
            else if (!/[a-z]/.test(pass1) || !/[A-Z]/.test(pass1) || !/\d/.test(pass1) || !/[^A-Za-z0-9]/.test(pass1))
                res.end(JSON.stringify({success: false, message: 'Password MUST have uppercase, lowercase, numbers and symbols.'}));
            else
                res.end(JSON.stringify({success: true, message: 'ok'}));
        } catch(error) {
            console.error('error validating password: ' + error.message);
            res.end(JSON.stringify({success: false, message: 'Something went wrong'}));
        }
    });
}