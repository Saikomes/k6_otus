// steps/login.js
import http from 'k6/http';
import { group, check, sleep } from 'k6';
import { BASE_URL, COMMON_HEADERS, FORM_HEADERS } from '../config.js';
import { extractUserSession } from '../helpers/session.js';
import { formBody } from '../helpers/utils.js';

export function runLogin(user) {
    group('TXN_Login', () => {

        // mainPageWelcome
        let res = http.get(`${BASE_URL}/cgi-bin/welcome.pl`, {
            headers: COMMON_HEADERS,
            params: { signOff: 'true' },
        });

        check(res, { 'welcome 200': (r) => r.status === 200 });

        // mainPageNav 
        res = http.get(`${BASE_URL}/cgi-bin/nav.pl`, {
            headers: COMMON_HEADERS,
            params: { in: 'home' },
        });

        check(res, { 'nav home 200': (r) => r.status === 200 });

        const userSession = extractUserSession(res);

        // loginPost
        const loginBody = formBody({
            userSession,
            username: user.username,
            password: user.password,
            'login.x': 47,
            'login.y': 4,
            JSFormSubmit: 'off',
        });

        res = http.post(`${BASE_URL}/cgi-bin/login.pl`, loginBody, {
            headers: FORM_HEADERS,
        });

        check(res, { 'login 200': (r) => r.status === 200 });

        // loginNav
        res = http.get(`${BASE_URL}/cgi-bin/nav.pl`, {
            headers: COMMON_HEADERS,
            params: { in: 'home', page: 'menu' },
        });
        check(res, { 'login nav 200': (r) => r.status === 200 });

        // loginGet
        res = http.get(`${BASE_URL}/cgi-bin/login.pl`, {
            headers: COMMON_HEADERS,
            params: { intro: 'true' },
        });
        check(res, { 'login get 200': (r) => r.status === 200 });

    });
}
