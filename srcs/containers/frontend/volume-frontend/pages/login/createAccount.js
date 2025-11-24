import { MyHtml } from "../../../myHtml.js";
import { loginPage } from "./login.js";

function createRegisterForm(formContainer) {
    const registerForm = MyHtml.createSubElement(formContainer, 'form', 'login-form', 1, "hor");
    registerForm.style.marginRight = "0px";
    const arrayDiv = [];

    registerForm.style.height = "600px";
    for (let i = 0; i < 5; i++) {
        const div = MyHtml.createSubElement(registerForm, 'div', 'div-column', 5, "ver");
        div.style.flexDirection = "row";
        if (i < 4)
        {
            const input = MyHtml.createSubElement(div, 'input', 'login-input', 1, "hor");
            switch (i) {
                case 0:
                    input.type = "text";
                    input.placeholder = "Username";
                    input.id = "register-username-input";
                    break;
                case 1:
                    input.type = "text";
                    input.placeholder = "email";
                    input.id = "register-email-input";
                    break;
                case 2:
                    input.type = "password";
                    input.placeholder = "Password";
                    input.id = "register-password1-input";
                    break;
                case 3:
                    input.type = "password";
                    input.placeholder = "Confirm Password";
                    input.id = "register-password2-input";
                    break;
                default:
                    break;
            }
        }
        arrayDiv.push(div);
    }
    const buttonsDiv = arrayDiv[4];
    const registerButtonDiv = MyHtml.createSubElement(buttonsDiv, 'div', 'div-column', 2, "hor");
    registerButtonDiv.style.width = "66%";
    registerButtonDiv.style.alignItems = "flex-end";

    const goBackButtonDiv = MyHtml.createSubElement(buttonsDiv, 'div', 'div-column', 2, "hor");
    goBackButtonDiv.style.width = "34%";
    goBackButtonDiv.style.alignItems = "flex-end";

    const registerButton = MyHtml.createSubElement(registerButtonDiv, 'button', 'register-button', 1, "hor");
    registerButton.type = "submit";
    registerButton.textContent = "Register";

    const goBackButton = MyHtml.createSubElement(goBackButtonDiv, 'button', 'register-goback-button', 1, "hor");
    goBackButton.type = "button";

    goBackButton.addEventListener('click', () => {
        console.log("Go Back clicked");
        const registerContainer = document.getElementById("register-container");
        registerContainer.remove();

        const main = document.getElementById("main-section");
        loginPage(main);
    });

    return registerForm;
}

export function createAccountPage() {
    console.log("Create Account clicked");
    const loginContainer = document.getElementById("login-container");
    if (loginContainer == null)
        return;
    loginContainer.remove();

    const main = document.getElementById("main-section");
    if (!main)
        return;

    const registerContainer = MyHtml.createElement('div', 'login');
    registerContainer.id = "register-container";
    registerContainer.style.flexDirection = "column";

    const resultContainer = MyHtml.createSubElement(registerContainer, 'div', 'div-column', 2, "ver");
    resultContainer.style.height = "20%";

    const formContainer = MyHtml.createSubElement(registerContainer, 'div', 'div-column', 2, "ver");
    formContainer.style.height = "80%";

    //const registerForm = createRegisterForm(formContainer);
    createRegisterForm(formContainer);
    main.appendChild(registerContainer);
}