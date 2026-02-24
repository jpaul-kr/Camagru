import {MyHtml} from '../../../myHtml.js';
import { homeTop } from './topSection.js';


export function homePage(main) {
	homeTop();
	const p = MyHtml.createSubElement2(main, 'p', null, null, null);
	p.textContent = 'homepage';
}
