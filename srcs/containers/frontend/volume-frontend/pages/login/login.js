import { MyHtml } from "../../../myHtml.js";
import { createAccountPage } from "./createAccount.js";

function forgotPasswordCall(){
    console.log("Forgot Password clicked");
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

    const passwordInput = MyHtml.createSubElement(passwordDiv, 'input', 'login-input', 1, "hor");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    passwordInput.style.marginBottom = "20px";

    const forgotPasswordLink = MyHtml.createSubElement(forgotPasswordDiv, 'a', 'login-forgotpassword', 1, "hor");
    forgotPasswordLink.href = "#";
    forgotPasswordLink.textContent = "Forgot Password?";
    forgotPasswordDiv.style.borderBottom = "2px solid #B0B0B0";
    forgotPasswordLink.addEventListener('click', forgotPasswordCall);

    const loginButton = MyHtml.createSubElement(loginButtonDiv, 'button', 'login-button', 1, "hor");
    loginButton.type = "submit";
    loginButton.textContent = "Login";

    const createAccountButton = MyHtml.createSubElement(createAccountDiv, 'button', 'login-createaccount-button', 1, "hor");
    createAccountButton.type = "button";
    createAccountButton.textContent = "Create Account";
    createAccountButton.addEventListener('click', createAccountPage);

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