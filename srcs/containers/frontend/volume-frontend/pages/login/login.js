import { MyHtml } from "../../../myHtml.js";
import { gotoRegister, gotoHomePage } from "../../pageRenderer.js";
import { forgotPasswordCall } from "./forgotPassword.js";
import { loginTop } from "../home/topSection.js";
import { getSecret, getServerAddr } from "../../getSecret.js";

function visiblePass(input, button) {
    button.classList.add('left-to-right');

    input.type = (input.type == 'password' ? input.type = 'text' : input.type = 'password');
    //console.log('inputPass ' + input.type);
    if (input.type == 'password')
        button.style.backgroundImage = 'url("./images/invisible_password.png")';
    else
        button.style.backgroundImage = 'url("./images/visible_password.png")';
    button.classList.remove('left-to-right');
}

async function loginCall(event, username, password) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
        event.preventDefault();
        const SERVER_ADDR = await getSecret('server_addr', 'server-addr');
        console.log('server_addr: ' + SERVER_ADDR);
        console.log("Login clicked with username: " + username + " and password: " + password);
        const res = await fetch(`${SERVER_ADDR}/backend/check-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, pass: password})
        });

        const data = await res.json();

        if (data.success) {
            alert("Login successful");
            gotoHomePage();
        }
        else {
            alert(data.message);
        }
    }
}

function createLoginForm(formContainer) {
    const loginForm = MyHtml.createSubElement(formContainer, 'form', 'login-form', 1, "hor");
    const usernameDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "ver");
    const passwordDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "ver");
    const forgotPasswordDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "ver");
    const loginButtonDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "ver");
    const createAccountDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "ver");

    const usernameInput = MyHtml.createSubElement(usernameDiv, 'input', 'login-input', 1, "hor");
    usernameInput.type = "text";
    usernameInput.placeholder = "Username";
    usernameInput.addEventListener('keydown', (event) => loginCall(event, usernameInput.value, passwordInput.value));

    const passwordInput = MyHtml.createSubElement(passwordDiv, 'input', 'login-input', 1, "hor");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    passwordInput.style.marginBottom = "20px";
    passwordInput.id = 'login-password-input';
    passwordInput.addEventListener('keydown', (event) => loginCall(event, usernameInput.value, passwordInput.value));

    const forgotPasswordLink = MyHtml.createSubElement(forgotPasswordDiv, 'a', 'login-forgotpassword', 1, "hor");
    forgotPasswordLink.href = "#";
    forgotPasswordLink.textContent = "Forgot Password?";
    forgotPasswordDiv.style.borderBottom = "2px solid #B0B0B0";
    forgotPasswordDiv.style.width = "90%";
    forgotPasswordLink.addEventListener('click', forgotPasswordCall);

    const loginButton = MyHtml.createSubElement(loginButtonDiv, 'button', 'button login-button', 1, "hor");
    loginButton.type = "button";
    loginButton.textContent = "Login";
    loginButton.addEventListener('click', (event) => loginCall(event, usernameInput.value, passwordInput.value));

    const createAccountButton = MyHtml.createSubElement(createAccountDiv, 'button', 'button login-createaccount-button', 1, "hor");
    createAccountButton.type = "button";
    createAccountButton.textContent = "Create Account";
    createAccountButton.addEventListener('click', gotoRegister);
    
    return loginForm;
}

export function loginPage(main) {
    const loginContainer = MyHtml.createElement('div', 'login');
    loginContainer.id = "login-container";
    const top = loginTop();
    main.appendChild(loginContainer);

    const welcomeContainer = MyHtml.createSubElement(loginContainer, 'div', "div-column", 2, "hor");

    welcomeContainer.id = "login-welcome-container";
    const welocomeMessage = MyHtml.createSubElement(welcomeContainer, 'div', 'login-welcome', 3, "ver");
    welocomeMessage.textContent = "Welcome to Camagru.";
    const introMessage = MyHtml.createSubElement(welcomeContainer, 'div', null, 3, "ver");
    introMessage.style.fontSize = "30px";
    introMessage.style.width = "80%";
    introMessage.style.marginLeft = "190px";
    introMessage.textContent = "The best place to share your custom photos with friends and family.";
    const instructionMessage = MyHtml.createSubElement(welcomeContainer, 'div', 'login-instruction', 3, "ver");
    instructionMessage.textContent = "Please login to continue.";

    const formContainer = MyHtml.createSubElement(loginContainer, 'div', 'login', 2, "hor"); 

    const loginForm = createLoginForm(formContainer);
    const visiblePassContainer = MyHtml.createSubElement2(formContainer, 'div', 'div-row', '20%', '100%');
    const visiblePassButton = MyHtml.createSubElement2(visiblePassContainer, 'button', 'button visible-pass-button', '60px', '60px');
    visiblePassButton.style.marginBottom = '172px';
    visiblePassButton.style.marginLeft = '12px';
    visiblePassContainer.style.justifyContent = 'left';

    const inputPass = document.getElementById('login-password-input');
    if (!inputPass) {
        console.log('no inputPass detected');
        return ;
    }
    visiblePassButton.addEventListener('click', () => {visiblePass(inputPass, visiblePassButton);});

    return loginContainer;
}