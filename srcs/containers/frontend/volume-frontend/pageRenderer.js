import { loginPage } from "./pages/login/login.js";
import { createAccountPage } from "./pages/login/createAccount.js";


export function gotoLogin() {
    history.pushState({}, '', '/login');
    pageRenderer(document.getElementById("main-section"));
}

export function gotoRegister() {
    history.pushState({}, '', '/register');
    pageRenderer(document.getElementById("main-section"));
}

export function pageRenderer(main) {
    const pathname = window.location.pathname;

    console.log("Rendering page for path: ", pathname);
    if (pathname == '/login')
        return loginPage(main);
    else if (pathname == '/register')
        return createAccountPage();
    else
        return loginPage(main);
}   