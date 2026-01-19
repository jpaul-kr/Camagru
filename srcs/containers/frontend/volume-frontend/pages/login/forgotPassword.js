import { MyHtml } from "../../../myHtml.js";
import dotenv from 'dotenv';

async function sendEmail(overlay, inputText) {
    console.log("entra en sendEmail");

    const res = await fetch(`${process.env.SERVER_ADDR}/backend/check-email-exists`, {
        method: 'POST',
        headers: {
            'Content-type': 'applicatin/json',
        },
        body: JSON.stringify({email: inputText})
    });
    const data = res.json();
    if (data.success)
        overlay.remove();
    return data.success;
}

async function createEmailPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay-popup';

    const popup = document.createElement('div');
    popup.className = 'popup'; 

    const pdiv = MyHtml.createSubElement2(popup, 'div', 'div-row', '100%', '45%');
    const sendDiv = MyHtml.createSubElement2(popup, 'div', 'div-row', '100%', '45%');

    const resultDiv = MyHtml.createSubElement2(popup, 'div', 'div-row', '100%', '10%');

    const inputDiv = MyHtml.createSubElement2(sendDiv, 'div', 'div-row', '85%', '100%');
    const sendButtonDiv = MyHtml.createSubElement2(sendDiv, 'div', 'div-row', '15%', '100%');

    const p = document.createElement('p');
    p.textContent = 'please add your email address below:';
    p.style.scale = '1.6';
    pdiv.appendChild(p);

    const input = MyHtml.createSubElement(inputDiv, 'input', 'login-input', 1, 'hor');
    input.placeholder = 'email';
    input.style.marginTop = 0;

    const sendButton = MyHtml.createSubElement(sendButtonDiv, 'button', 'button send-forgot-password-button', 1, 'hor');
    sendButton.textContent = "send";
    //sendButton.margin-bottom = 0;
    // sendButton.margin-right = 'px';
    let resultP;
    sendButton.addEventListener('click', () => {
        const result = sendEmail(overlay, input.value);
        
        resultP.remove();
        if (!result) {
            resultP = MyHtml.createSubElement2(resultDiv, 'p', 'send-forgot-pass-fail', '100%', '100%');
            resultP.textContent = 'No email Found';
        }
    });

    overlay.addEventListener('ESC', overlay.remove);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    return overlay;
}

export async function forgotPasswordCall() {
    const main = document.getElementById('main-section');
    if (!main)
        return ;
    const popup = createEmailPopup();
}