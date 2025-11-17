import { MyHtml } from "../../../myHtml.js"; 

export function loginPage(main) {
    const loginContainer = MyHtml.createElement('div', 'login');

    // main.appendChild(loginContainer);

    const welcomeContainer = MyHtml.createSubElement(loginContainer, 'div', "div-column", 2, "row");
    const welocomeMessage = MyHtml.createSubElement(welcomeContainer, 'div', 'login-welcome', 3, "col");
    welocomeMessage.textContent = "Welcome to Camagru.";
    const introMessage = MyHtml.createSubElement(welcomeContainer, 'div', null, 3, "col");
    introMessage.style.fontSize = "30px";
    introMessage.style.width = "80%";
    introMessage.textContent = "The best place to share your custom photos with friends and family.";
    const instructionMessage = MyHtml.createSubElement(welcomeContainer, 'div', 'login-instruction', 3, "col");
    instructionMessage.textContent = "Please login to continue.";

    const formContainer = MyHtml.createSubElement(loginContainer, 'div', 'login', 2, "row"); 

    const loginForm = MyHtml.createSubElement(formContainer, 'form', 'login-form', 1, "row");

    main.appendChild(loginContainer);
}