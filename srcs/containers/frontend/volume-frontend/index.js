
//import dotenv from 'dotenv';
import { loginPage } from './volume-frontend/pages/login/login.js';

const apiUrl = 'http://localhost:3000';

function loadStyles(cssPath, faviconPath) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = cssPath;
    document.head.appendChild(css);

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/icon';
    favicon.href = faviconPath;
    document.head.appendChild(favicon);
  }

function createTop() {
    const top = document.createElement('div');
    top.classList.add('top');

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = "Camagru";
    top.appendChild(title);

    const logo = document.createElement('img');
    logo.style.height = "100%";
    logo.style.width = "200px";
    logo.src = './images/logo.png';
    top.appendChild(logo);
    top.id = "top_section";
    
    document.body.appendChild(top);
    return top;
}

function createMain() {
    const main = document.createElement('div');
    main.classList.add('main');
    main.id = "main-section";
    const loginContainer = loginPage(main);
    //main.appendChild(loginContainer);
    document.body.appendChild(main);
    return main;
}

async function main() {
    try {
        loadStyles('./style.css', './favicon.ico');
        const page = document.createElement('div');
        page.classList.add('page');
        const top = createTop();
        const main = createMain();
        
        page.appendChild(top);
        page.appendChild(main);
        document.body.appendChild(page);
        console.log("Volume Frontend is running");
        console.log("Volume Backend is " + apiUrl);
    } catch (error) {
        console.error("Error fetching number from backend:", error);
    }
}

window.onload = main;