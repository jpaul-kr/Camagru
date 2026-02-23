import {MyHtml} from '../../../myHtml.js';

export function homeTop() {
	const top = document.getElementById('top-section');
	if (!top)
		return ;
	top.innerHTML = '';
	top.classList.add('top');

	const titleDiv = MyHtml.createSubElement2(top, 'div', 'div-row', '80%', '100%');
	titleDiv.style.justifyContent = 'center';
	titleDiv.style.marginTop = '10px';
	

	const title = MyHtml.createSubElement2(titleDiv, 'h1', 'title', null, null);
	title.textContent = 'Camagru';
	title.style.fontSize = '100px';

	const logo = MyHtml.createSubElement2(titleDiv, 'div', 'logo', '190px', '190px');

	const buttonsDiv = MyHtml.createSubElement2(top, 'div', 'div-row', '20%', '100%');
	const logoutDiv = MyHtml.createSubElement2(buttonsDiv, 'div', 'div-top', '33%', '100%');
	const settingsDiv = MyHtml.createSubElement2(buttonsDiv, 'div', 'div-top', '33%', '100%');
	const searchDiv = yHtml.createSubElement2(buttonsDiv, 'div', 'div-top', '33%', '100%');

	const logoutButton = MyHtml.createSubElement2(logoutDiv, 'button', 'button img-button', null, null);
	logoutButton.src = '../../../images/logout.png';
}

export function homePage(main) {
	homeTop();
	const p = MyHtml.createSubElement2(main, 'p', null, null, null);
	p.textContent = 'homepage';
}
