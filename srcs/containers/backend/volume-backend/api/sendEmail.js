import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { getSecret } from '../getSecret.js';
import crypto from 'crypto';
import {db, addToPendingUsers, addToChangePassword} from '../database.js';

dotenv.config();


export async function sendEmail(email, htmlcontent) {
    try {
        const pass = await getSecret('email_pass', 'email-pass');
        console.log('vault email pass: ' + pass);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_DOMAIN,
                pass: pass
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL_DOMAIN,
            to: email,
            subject: 'Camagru',
            html: htmlcontent
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email: ', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch (error) {
        console.error('Error in sendEmail: ', error.message);
    }
}

export async function sendConfirmationEmail(req, res) {
    let body = '';
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", async () => {
        req.body = JSON.parse(body);
        const {email, username, password} = req.body;
        try {
            const token = crypto.randomUUID();
            const htmlcontent = `<h1>Welcome to Camagru!</h1>
                <div>
                    <p>please confirm your email:</p>
                </div>
                <div>
                    <a href="http://localhost:8443/backend/register-user?token=${token}">Confirm Email</a>
                </div>`;
            addToPendingUsers(username, email, password, token);
            sendEmail(email, htmlcontent);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({success: true}));
        }
        catch (error) {
            console.error('Error sending confirmation email: ', error.message);
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({success: false, error: 'Internal server error'}));
        }
    });
}

export async function sendForgotPasswordEmail(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        req.body = JSON.parse(body);
        const {email} = req.body;
        try{
            const token = crypto.randomUUID();
            const htmlcontent = `<h1>Camagru assistance</h1>
                <div>
                    <p>Click the link bellow to change your password:</p>
                </div>
                <div>
                    <a href="http://localhost:8443/backend/reset-password?token=${token}">Change password</a>
                </div>`;
            addToChangePassword(email, token);
            sendEmail(email, htmlcontent);
            res.end(JSON.stringify({success: true}));
        }
        catch(error) {
            console.log('error sending link to reset password');
            res.end(JSON.stringify({success: false}));
        }
    });
}