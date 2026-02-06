import { MyHtml } from "../../../myHtml.js";
import { loginPage } from "./login.js";
import { checkData, sendConfirmationEmail } from "./register.js";

function passwordCheck(pass1, pass2) {
    const resultContainer = document.getElementById('register-result-container');
    if (!resultContainer)
        return false;

    if (pass1 !== pass2) {
        addImage(resultContainer, false);
        setTimeout(() => {
            alert("Passwords do not match.");
        }, 50);
        return false;
    }

    if (pass1.length < 8) {
        addImage(resultContainer, false);
        setTimeout(() => {
            alert("Password has to be minimum 8 characters long.");
        }, 50);
        return false;
    }

    if (pass1.includes(" ") || pass1.includes('/t') || pass1.includes('/v')) {
        addImage(resultContainer, false);
        setTimeout(() => {
            alert("Password cannot have spaces or tabs.");
        }, 50);
        return false;
    }

    if (!/[a-z]/.test(pass1) || !/[A-Z]/.test(pass1) || !/\d/.test(pass1) || !/[^A-Za-z0-9]/.test(pass1)) {
        addImage(resultContainer, false);
        setTimeout(() => {
            alert("Password MUST have uppercase, lowercase, numbers and symbols.");
        }, 50);
        return false;
    }
    return true;
}

function addImage(resultContainer, isOk) {
    const result = document.createElement('img');
    result.src = (isOk ? '../../../images/success.png' : '../../../images/failure.png');

    resultContainer.innerHTML = '';
    result.style.height = "160px";
    result.style.width = "160px";
    result.style.marginTop = "35px";
    resultContainer.appendChild(result);
}

async function registrationFormHandler(event) {
    event.preventDefault();
    console.log("Register button clicked");
    const usernameInput = document.getElementById("register-username-input");
    const emailInput = document.getElementById("register-email-input");
    const password1Input = document.getElementById("register-password1-input");
    const password2Input = document.getElementById("register-password2-input");
    const resultContainer = document.getElementById("register-result-container");

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password1 = password1Input.value.toString();
    const password2 = password2Input.value.toString();

    if (!username || !email || !password1 || !password2) {
        addImage(resultContainer, false);
        setTimeout(() => {
            alert("Please fill in all fields.");
        }, 50);
        return ;
    }

    if (!passwordCheck(password1, password2))
        return ;

    // Here you would typically send the registration data to the server
    console.log("Registering user:", { username, email, password: password1 });
    const data = await checkData(username, email, password1);
    if (data.success === false) {
        addImage(resultContainer, false);
        setTimeout(() => {
            alert(`Registration failed: ${data.error}`);
        }, 50);
        return;
    }
    const emailData = await sendConfirmationEmail(username, email, password1);
    if (emailData.success) {
        addImage(resultContainer, true);
        setTimeout(() => {
            alert("We have sent you a confirmation email. Please check your inbox to activate your account.");
        }, 50);
    }
    else
    {
        addImage(resultContainer, false);
        setTimeout(() => {
            alert("There has been an error trying to send you the confimtion email.");
        }, 50);
    }
}

function createRegisterForm(formContainer) {
    const registerForm = MyHtml.createSubElement(formContainer, 'form', 'login-form', 1, "hor");
    registerForm.id = "register-form";
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
    const inputpass1 = document.getElementById('register-password1-input');
    const inputpass2 = document.getElementById('register-password2-input');

    const buttonsDiv = arrayDiv[4];
    const registerButtonDiv = MyHtml.createSubElement(buttonsDiv, 'div', 'div-column', 2, "hor");
    registerButtonDiv.style.width = "66%";
    registerButtonDiv.style.alignItems = "flex-end";

    const goBackButtonDiv = MyHtml.createSubElement(buttonsDiv, 'div', 'div-column', 2, "hor");
    goBackButtonDiv.style.width = "34%";
    goBackButtonDiv.style.alignItems = "flex-end";

    const registerButton = MyHtml.createSubElement(registerButtonDiv, 'button', 'button register-button', 1, "hor");
    registerButton.type = "button";
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

    registerButton.addEventListener('click', registrationFormHandler);
    inputpass1.addEventListener('keydown', (event) => {
        if (event.key == 'Enter')
            registrationFormHandler();
    });
    inputpass2.addEventListener('keydown', (event) => {
        if (event.key == 'Enter')
            registrationFormHandler();
    });

    return registerForm;
}

export function createAccountPage(main) {
    console.log("Create Account clicked");
    // const loginContainer = document.getElementById("login-container");
    // if (loginContainer == null)
    //     return;
    // loginContainer.remove();

    // const main = document.getElementById("main-section");
    // if (main == null)
    //     return;

    console.log("llega " + main);
    const registerContainer = MyHtml.createElement('div', 'login');
    registerContainer.id = "register-container";
    registerContainer.style.flexDirection = "column";

    const resultContainer = MyHtml.createSubElement(registerContainer, 'div', 'div-column', 2, "ver");
    resultContainer.id = "register-result-container";
    resultContainer.style.height = "20%";

    const formContainer = MyHtml.createSubElement(registerContainer, 'div', 'div-column', 2, "ver");
    formContainer.style.height = "80%";

    //const registerForm = createRegisterForm(formContainer);
    main.appendChild(registerContainer);
    createRegisterForm(formContainer);
    return registerContainer;
}