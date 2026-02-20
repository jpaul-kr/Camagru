import {MyHtml} from '../../../myHtml.js';

export function homeTop() {
	const top = document.getElementById('top-section');
	if (!top)
		return ;
	top.innerHTML = '';
	top.classList.add('top');

	const titleDiv = MyHtml.createSubElement2(top, 'div', 'div-row', '50%', '100%');
	titleDiv.style.justifyContent = 'left';
	titleDiv.style.marginTop = '10px';

	const title = MyHtml.createSubElement2(titleDiv, 'h1', 'title', null, null);
	title.textContent = 'Camagru';
	title.style.fontSize = '100px';

	const logo = MyHtml.createSubElement2(titleDiv, 'img', 'logo', '180px', '180px');

	const buttonsDiv = MyHtml.createSubElement2(top, 'div', 'div-row', '50%', '100%');
}

export function homePage(main) {
	homeTop();
	const p = MyHtml.createSubElement2(main, 'p', null, null, null);
	p.textContent = 'homepage';
}
