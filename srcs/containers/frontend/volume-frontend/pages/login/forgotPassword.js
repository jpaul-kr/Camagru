import { MyHtml } from "../../../myHtml.js";
import { passwordCheck } from "./createAccount.js";

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

async function sendEmailCheck(inputText, resultP, event) {
    if (event.type == 'click' || (event.type == 'keydown' && event.key == 'Enter'))
    {
        const result = await sendEmail(inputText);
            
        console.log('result for sendButton: ' + result);
        if (!result)
            resultP.textContent = 'No email Found';
        else {
            resultP.style.color = '#58F728';
            resultP.textContent = 'Email has been sent!';
        }
    }
}

function EscTriggered(event) {
    if (event.key == 'Escape')
    {
        const overlay = document.getElementById('overlay-popup-forgotpass');
        if (overlay)
            overlay.remove();
        document.removeEventListener('keydown', EscTriggered);
    }
}

async function createEmailPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay-popup';
    overlay.id = 'overlay-popup-forgotpass';

    const popup = document.createElement('div');
    popup.className = 'popup';

    const CloseTabDiv = MyHtml.createSubElement2(popup, 'div', 'div-row', '100%', '10%');
    CloseTabDiv.style.justifyContent = 'right';
    const XbuttonDiv = MyHtml.createSubElement2(CloseTabDiv, 'div', 'div-row', '10%', '100%');
    XbuttonDiv.style.width = '50px';
    XbuttonDiv.style.height = '50px';

    const pdiv = MyHtml.createSubElement2(popup, 'div', 'div-row', '100%', '40%');
    const sendDiv = MyHtml.createSubElement2(popup, 'div', 'div-row', '100%', '40%');

    const resultDiv = MyHtml.createSubElement2(popup, 'div', 'div-row', '100%', '10%');

    const inputDiv = MyHtml.createSubElement2(sendDiv, 'div', 'div-row', '85%', '100%');
    const sendButtonDiv = MyHtml.createSubElement2(sendDiv, 'div', 'div-row', '15%', '100%');

    const Xbutton = MyHtml.createSubElement2(XbuttonDiv, 'button', 'close-tab-button', '100%', '100%');

    const p = document.createElement('p');
    p.textContent = 'please add your email address below:';
    p.style.scale = '1.6';
    p.style.color = '#8A8A8A';
    pdiv.appendChild(p);

    const input = MyHtml.createSubElement(inputDiv, 'input', 'login-input', 1, 'hor');
    input.placeholder = 'email';
    input.style.marginTop = 0;

    const sendButton = MyHtml.createSubElement(sendButtonDiv, 'button', 'button send-forgot-password-button', 1, 'hor');
    sendButton.textContent = "send";
    let resultP = MyHtml.createSubElement2(resultDiv, 'p', 'send-forgot-pass-text', '100%', '100%');
    sendButton.addEventListener('click', (event) => {
        sendEmailCheck(input.value, resultP, event);
    });
    input.addEventListener('keydown', (event) => {
        sendEmailCheck(input.value, resultP, event);
    });

    Xbutton.addEventListener('click', () => {
        overlay.remove();
    });
    document.addEventListener('keydown', EscTriggered);
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

async function changePasswordCall(input, token) {
    console.log('changePassword called ' + input);

    const res = await fetch('http://localhost:8443/backend/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({newPassword: input, token: token})
    });

    const data = await res.json();

    alert(data.message);
    return data.success;
}

async function changePasswordCheck(isAlreadyOk, event, token) {
    if (event.type == 'click' || (event.type == 'keydown' && event.key == 'Enter')) {
        const input1 = document.getElementById('change-pass1');
        const input2 = document.getElementById('change-pass2');

        console.log('isAlreadyOk: ' + isAlreadyOk);
        if (!input1 || !input2) {
            alert('there has been an error trying to get passwords');
            return false;
        }
        if (input1.value != input2.value) {
            setTimeout(() => {
                alert("Passwords do not match.");
            }, 50);
            return false;
        }
        if (!passwordCheck(input1.value, input2.value))
            return false;
        if (!isAlreadyOk)
            isAlreadyOk = await changePasswordCall(input1.value, token);
        else
            alert('password has already been changed');
        }
        return isAlreadyOk;
}

export async function changePasswordPage(main) {
    let token = new URLSearchParams(window.location.search).get('token');

    if (!token)
        console.log("Invalid token for reset password");

    const formDiv = MyHtml.createSubElement2(main, 'div', 'div-column', '100%', '100%');
    const form = MyHtml.createSubElement2(formDiv, 'form', 'change-password-form', null, null);
    const input1Div = MyHtml.createSubElement2(form, 'div', 'div-column', '100%', '30%');
    const input2Div = MyHtml.createSubElement2(form, 'div', 'div-column', '100%', '30%');
    const lineDiv = MyHtml.createSubElement2(form, 'div', 'div-column', '100%', '10%');
    const changePasswordButtonDiv = MyHtml.createSubElement2(form, 'div', 'div-column', '100%', '30%');

    const input1 = MyHtml.createSubElement2(input1Div, 'input', 'login-input', '80%', null);
    input1.placeholder = 'New Password';
    input1.type = 'Password';
    input1.id = 'change-pass1';

    const input2 = MyHtml.createSubElement2(input2Div, 'input', 'login-input', '80%', null);
    input2.placeholder = 'Confirm New Password';
    input2.type = 'Password';
    input2.id = 'change-pass2';

    lineDiv.style.borderBottom = "2px solid #B0B0B0";
    lineDiv.style.width = "80%";

    const changePasswordButton = MyHtml.createSubElement2(changePasswordButtonDiv, 'button', 'button login-button', '60%', null);
    changePasswordButton.textContent = 'Change Password';
    changePasswordButton.type = 'button';
    let isAlreadyOk = false;
    changePasswordButton.addEventListener('click', async (event) => {
        if (!isAlreadyOk)
            isAlreadyOk = await changePasswordCheck(isAlreadyOk, event, token);
    });
    input1.addEventListener('keydown', async (event) => {
        if (!isAlreadyOk)
            isAlreadyOk = await changePasswordCheck(isAlreadyOk, event, token);
    });
    input2.addEventListener('keydown', async (event) => {
        if (!isAlreadyOk)
            isAlreadyOk = await changePasswordCheck(isAlreadyOk, event, token);
    });
}