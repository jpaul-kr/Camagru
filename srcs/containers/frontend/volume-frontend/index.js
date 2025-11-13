
//import dotenv from 'dotenv';

const apiUrl = 'http://localhost:3000';
console.log("apiUrl: " + apiUrl);

function loadCSS(path) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path;
    document.head.appendChild(link);
  }

function createTitle() {
    const top = document.createElement('div');
    top.classList.add('top');

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = "Camagru";
    top.appendChild(title);

    const logo = document.createElement('img');
    logo.src = './images/logo.png';
    top.appendChild(logo);
    
    document.body.appendChild(top);
    return top;
}

async function main() {
    try {
        loadCSS('./style.css');
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