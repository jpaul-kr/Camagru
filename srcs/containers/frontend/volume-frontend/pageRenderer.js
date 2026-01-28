import { loginPage } from "./pages/login/login.js";
import { createAccountPage } from "./pages/login/createAccount.js";
import { changePasswordPage } from "./pages/login/forgotPassword.js";


export function gotoLogin() {
    history.pushState({}, '', '/login');
    pageRenderer(document.getElementById("main-section"));
}

export function gotoRegister() {
    history.pushState({}, '', '/register');
    pageRenderer(document.getElementById("main-section"));
}

export function gotoresetPassword()  {
    history.pushState({}, '', '/reset-password');
    pageRenderer(document.getElementById("main-section"));
}

export function pageRenderer(main) {
    const pathname = window.location.pathname;

    console.log("Rendering page for path: " + pathname + " main " + main);
    main.innerHTML = "";
    if (pathname == '/login')
        return loginPage(main);
    else if (pathname == '/register')
        return createAccountPage(main);
    else if (pathname == 'reset-password')
        return changePasswordPage(main);
    else
        return loginPage(main);
}   