import { loginPage } from "./pages/login/login.js";
import { createAccountPage } from "./pages/login/createAccount.js";
import { changePasswordPage } from "./pages/login/forgotPassword.js";
import { homePage } from "./pages/home/homePage.js";
import { getSecret} from "./getSecret.js";

export function gotoLogin() {
    history.pushState({}, '', '/login');
    pageRenderer(document.getElementById("main-section"));
}

export function gotoRegister() {
    history.pushState({}, '', '/register');
    pageRenderer(document.getElementById("main-section"));
}

export function gotoResetPassword()  {
    history.pushState({}, '', '/reset-password');
    pageRenderer(document.getElementById("main-section"));
}

export async function gotoHomePage() {
    history.pushState({}, '', '/home');
    pageRenderer(document.getElementById("main-section"));
}

export function pageRenderer(main) {
    const pathname = window.location.pathname;

    console.log("Rendering page for path: " + pathname + " main " + main);
    main.innerHTML = "";
    if (pathname === '/login')
        return loginPage(main);
    else if (pathname === '/register')
        return createAccountPage(main);
    else if (pathname === '/reset-password')
        return changePasswordPage(main);
    else if (pathname === '/home')
        return homePage(main);
    else
        return loginPage(main);
}

export async function authCookie() {
    console.log('enters auth Cookie');
    const SERVER_ADDR = await getSecret('server_addr', 'server-addr');
    const res = await fetch(`${SERVER_ADDR}/backend/check-cookie`, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();

    if (data.message !== 'Unauthorized')
        return data.success;
    const res2 = await fetch(`${SERVER_ADDR}/backend/refresh-cookie`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data2 = await res2.json();
    return data2.success;
}
