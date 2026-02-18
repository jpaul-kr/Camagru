import {MyHtml} from '../../../myHtml.js';


export function homePage(main) {
	const p = MyHtml.createSubElement2(main, 'p', null, null, null);
	p.textContent = 'homepage';
}
