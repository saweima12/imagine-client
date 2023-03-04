import { splitCookieString } from './cookie';
import { COOKIE_USER, COOKIE_PWD } from 'lib/types';

export function getUserInfo(): {ua: string, up: string} {

    const cookieDict = splitCookieString(document.cookie);

    const ua = cookieDict[COOKIE_USER];
    const up = cookieDict[COOKIE_PWD];


    return {
        ua: ua,
        up: up 
    }
}