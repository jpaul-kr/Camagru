import {MyHtml} from '../../../myHtml.js';
import { homeTop } from './topSection.js';
import {authCookie, gotoLogin} from '../../pageRenderer.js'


export async function homePage(main) {
	const auth = await authCookie();
	console.log('auth: ' + auth);
    if (!auth) {
        gotoLogin();
		return ;
	}
	homeTop();
	const p = MyHtml.createSubElement2(main, 'p', null, null, null);
	p.textContent = 'homepage';
}
