import { MyHtml } from "../../../myHtml.js";

function sendEmail(overlay, inputText) {
    console.log("entra en sendEmail");
    overlay.remove();
}

async function createEmailPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay-popup';

    const popup = document.createElement('div');
    popup.className = 'popup';

    const pdiv = MyHtml.createSubElement(popup, 'div', 'div-row', 2, 'ver');
    const sendDiv = MyHtml.createSubElement(popup, 'div', 'div-row', 2, 'ver');

    const inputDiv = MyHtml.createSubElement(sendDiv, 'div', 'div-row', 2, 'hor');
    inputDiv.style.width = '80%';
    const sendButtonDiv = MyHtml.createSubElement(sendDiv, 'div', 'div-row', 2, 'hor');
    sendButtonDiv.style.width = '20%';

    // hay que cambiar los tamanyos de elementos en el popup(sale raro) 

    const p = document.createElement('p');
    p.textContent = 'please add your email address below:';
    pdiv.appendChild(p);

    const input = MyHtml.createSubElement(inputDiv, 'input', 'login-input', 1, 'hor');
    input.placeholder = 'email';
    input.style.marginTop = 0;

    const sendButton = MyHtml.createSubElement(sendButtonDiv, 'button', 'register-button', 1, 'hor');
    sendButton.textContent = "send";
    //sendButton.margin-bottom = 0;
    // sendButton.margin-right = 'px';
    sendButton.addEventListener('click', sendEmail(overlay));

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