
//import dotenv from 'dotenv';

const apiUrl = 'http://localhost:3000';

function loadStyles(cssPath, faviconPath) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = cssPath;
    document.head.appendChild(css);

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = faviconPath;
    document.head.appendChild(favicon);
  }

function createTitle() {
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
    
    document.body.appendChild(top);
    return top;
}

async function main() {
    try {
        loadStyles('./style.css', './images/logo.png');
        const top = createTitle();
        const main = document.createElement('div');
        const res = await fetch(`${apiUrl}/get-number`);
        const data = await res.json();
        const number = data.result;
        main.textContent = `Number from backend: ${number}`;
        
        document.body.appendChild(main);
        console.log("Volume Frontend is running");
        console.log("Volume Backend is " + apiUrl);
    } catch (error) {
        console.error("Error fetching number from backend:", error);
    }
}

window.onload = main;