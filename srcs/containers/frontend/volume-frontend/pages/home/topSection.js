import { MyHtml } from "../../../myHtml.js";
import { gotoLogin } from "../../pageRenderer.js";

function topButtons(top) {
	const buttonsDiv = MyHtml.createSubElement2(top, 'div', 'div-row', '30%', '100%');
	const logoutDiv = MyHtml.createSubElement2(buttonsDiv, 'div', 'div-top', '20%', '100%');
	const settingsDiv = MyHtml.createSubElement2(buttonsDiv, 'div', 'div-top', '20%', '100%');
	const inputDiv = MyHtml.createSubElement2(buttonsDiv, 'div', 'div-top', '40%', '100%');
	const searchDiv = MyHtml.createSubElement2(buttonsDiv, 'div', 'div-top', '20%', '100%');

	inputDiv.style.display = 'none';
	
	const logoutButton = MyHtml.createSubElement2(logoutDiv, 'button', 'button img-button', null, null);
	logoutButton.style.backgroundImage = 'url("./images/logout.png")';

	const settingsButton = MyHtml.createSubElement2(settingsDiv, 'button', 'button img-button', null, null);
	settingsButton.style.backgroundImage = 'url("./images/settings.png")';

	const searchButton = MyHtml.createSubElement2(searchDiv, 'button', 'button img-button', null, null);
	searchButton.style.backgroundImage = 'url("./images/search.png")';

	const searchInput = MyHtml.createSubElement2(inputDiv, 'input', 'search-input', null, null);
	searchInput.placeholder = 'search name';
	searchInput.style.marginBottom = '14px';
	searchButton.addEventListener('click', () => {
		if (inputDiv.style.display === 'none') {
			inputDiv.style.display = 'flex';
			searchInput.focus();
		} else {
			inputDiv.style.display = 'none';
		}
	});

    logoutButton.addEventListener('click', gotoLogin);

	return buttonsDiv;
}

export function homeTop() {
	const top = document.getElementById('top-section');
	if (!top)
		return ;
	top.innerHTML = '';
	top.classList.add('top');

	const titleDiv = MyHtml.createSubElement2(top, 'div', 'div-row', '70%', '100%');
	titleDiv.style.justifyContent = 'center';

	const title = MyHtml.createSubElement2(titleDiv, 'h1', 'title', null, null);
	title.textContent = 'Camagru';
	title.style.fontSize = '100px';
	title.style.marginBottom = '26px';

	const logo = MyHtml.createSubElement2(titleDiv, 'div', 'logo', '190px', '190px');

	const buttonsDiv = topButtons(top);
	buttonsDiv.style.marginBottom = '20px';
    buttonsDiv.style.justifyContent = 'right';
    return top;
}

export function loginTop() {
    const top = document.getElementById('top-section');
    if (!top)
        return ;
    top.innerHTML = '';
	top.classList.add('top');

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = "Camagru";
    top.appendChild(title);

    const logo = MyHtml.createSubElement2(top, 'div', 'logo', '200px', '200px');
    return top;
}