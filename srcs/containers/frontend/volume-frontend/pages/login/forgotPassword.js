import { MyHtml } from "../../../myHtml.js";

async function sendEmail(inputText) {
    console.log("entra en sendEmail");

    const res = await fetch(`http://localhost:8443/backend/check-email-exists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'applicatin/json',
        },
        body: JSON.stringify({email: inputText})
    });
    const data = await res.json();
    console.log('acaba check-email-exists resultado: ' + data.result);
    if (data.result) {
        const res2 = await fetch(`http://localhost:8443/backend/send-forgot-password-email`, {
            method: 'POST',
            headers: {
                'Content-type': 'applicatin/json',
            },
            body: JSON.stringify({email: inputText})
        });
        const data2 = await res2.json();
        if (data2.success === false)
            return false;
        console.log('acaba send-forgot-password resultado: ' + data2.success);
    }
    return data.result;
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
    let resultP = null;
    sendButton.addEventListener('click', async () => {
        const result = await sendEmail(input.value);
        
        console.log('result for sendButton: ' + result);
        if (resultP != null || resultP != undefined)
            resultP.remove();
        console.log()
        if (!result) {
            resultP = MyHtml.createSubElement2(resultDiv, 'p', 'send-forgot-pass-fail', '100%', '100%');
            resultP.textContent = 'No email Found';
        }
        else {
            resultP = MyHtml.createSubElement2(resultDiv, 'p', 'send-forgot-pass-success', '100%', '100%');
            resultP.textContent = 'Email has been sent!';
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

export async function changePasswordPage(main) {
    let token = new URLSearchParams(window.location.search).get('token');

    if (!token)
        showError("Invalid token for reset password");

    const p = document.createElement('p');
    p.innerText = 'dudu dududud dudud ';
    main.appendChild(p);
}