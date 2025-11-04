
//import dotenv from 'dotenv';

const apiUrl = 'http://localhost:3000';

async function main() {
    const top = document.createElement('div');
    top.textContent = "Volume Frontend Loaded";
    const main = document.createElement('div');
    const res = await fetch(`${apiUrl}/get-number`);
    const data = await res.json();
    const number = data.result;
    main.textContent = `Number from backend: ${number}`;
    document.body.appendChild(top);
    document.body.appendChild(main);
    console.log("Volume Frontend is running");
}

window.onload = main;