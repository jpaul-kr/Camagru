import { MyHtml } from "../../../myHtml.js";
import { gotoRegister, gotoHomePage } from "../../pageRenderer.js";
import { forgotPasswordCall } from "./forgotPassword.js";
//import { createAccountPage } from "./createAccount.js";

async function loginCall(event, username, password) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
        event.preventDefault();
        console.log("Login clicked with username: " + username + " and password: " + password);
        // await fetch('/backend/check-login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({username: username, pass: password})
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         console.log("Login successful");
        //         gotoHomePage();
        //     } else {
        //         alert(data.message);
        //     }
        // })
        // .catch(error => {
        //     console.error('Error during login:', error);
        //     alert('An error occurred during login. Please try again later.');
        // });
        const res = await fetch('http://localhost:8443/backend/check-login', {
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
    main.appendChild(loginContainer);
    return loginContainer;
}