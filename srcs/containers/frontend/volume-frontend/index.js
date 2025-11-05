
//import dotenv from 'dotenv';

const apiUrl = 'http://localhost:3000';
console.log("apiUrl: " + apiUrl);

async function main() {
    const top = document.createElement('div');
    top.textContent = "Volume Frontend Loaded";
    document.body.appendChild(top);
    try {
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