
async function main() {
    const top = document.createElement('div');
    top.textContent = "Volume Frontend Loaded";
    const main = document.createElement('div');
    const data = await fetch('http://backend/get-number');
    const number = await data.json().result;
    main.textContent = `Number from backend: ${number}`;
    document.body.appendChild(top);
    document.body.appendChild(main);
    console.log("Volume Frontend is running");
}

window.onload = main;