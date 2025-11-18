import { MyHtml } from "../../../myHtml.js"; 

function forgotPasswordCall(){
    console.log("Forgot Password clicked, you dumbfuck");
}

function createLoginForm(formContainer) {
    const loginForm = MyHtml.createSubElement(formContainer, 'form', 'login-form', 1, "row");
    const usernameDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "col");
    const passwordDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "col");
    const forgotPasswordDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "col");
    const loginButtonDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "col");
    const createAccountDiv = MyHtml.createSubElement(loginForm, 'div', 'div-column', 5, "col");

    const usernameInput = MyHtml.createSubElement(usernameDiv, 'input', 'login-input', 1, "row");
    usernameInput.type = "text";
    usernameInput.placeholder = "Username";

    const passwordInput = MyHtml.createSubElement(passwordDiv, 'input', 'login-input', 1, "row");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    passwordInput.style.marginBottom = "20px";

    const forgotPasswordLink = MyHtml.createSubElement(forgotPasswordDiv, 'a', 'login-forgotpassword', 1, "row");
    forgotPasswordLink.href = forgotPasswordCall();
    forgotPasswordLink.textContent = "Forgot Password?";
    forgotPasswordDiv.style.borderBottom = "2px solid #DADDE1";
    forgotPasswordDiv.style.width = "90%";

    const loginButton = MyHtml.createSubElement(loginButtonDiv, 'button', 'login-button', 1, "row");
    loginButton.type = "submit";
    loginButton.textContent = "Login";

    const createAccountButton = MyHtml.createSubElement(createAccountDiv, 'button', 'login-createaccount-button', 1, "row");
    createAccountButton.type = "button";
    createAccountButton.textContent = "Create Account";

    return loginForm;
}
export function loginPage(main) {
    const loginContainer = MyHtml.createElement('div', 'login');

    const welcomeContainer = MyHtml.createSubElement(loginContainer, 'div', "div-column", 2, "row");
    const welocomeMessage = MyHtml.createSubElement(welcomeContainer, 'div', 'login-welcome', 3, "col");
    welocomeMessage.textContent = "Welcome to Camagru.";
    const introMessage = MyHtml.createSubElement(welcomeContainer, 'div', null, 3, "col");
    introMessage.style.fontSize = "30px";
    introMessage.style.width = "80%";
    introMessage.style.marginLeft = "190px";
    introMessage.textContent = "The best place to share your custom photos with friends and family.";
    const instructionMessage = MyHtml.createSubElement(welcomeContainer, 'div', 'login-instruction', 3, "col");
    instructionMessage.textContent = "Please login to continue.";

    const formContainer = MyHtml.createSubElement(loginContainer, 'div', 'login', 2, "row"); 

    const loginForm = createLoginForm(formContainer);

    main.appendChild(loginContainer);
}