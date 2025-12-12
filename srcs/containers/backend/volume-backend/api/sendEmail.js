import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export function sendEmail(email) {
    try {
        const transporter = nodemailer.createTransport({
            // host: 'jonpk555@gmail.com',
            // port: 587,
            // secure: false,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_DOMAIN,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_DOMAIN,
            to: 'jonpk555@gmail.com',
            subject: 'Camagru',
            text: 'Welcome to Camagru!'
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