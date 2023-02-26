import { splitCookieString } from "lib/utils";
import { checkAuthorized } from 'lib/api';
import { COOKIE_USER, COOKIE_PWD} from 'types';

export function checkUserAuthorized(cookie_str?: string): boolean {

    cookie_str = cookie_str || document.cookie;
    // console.log(cookie_str)
    const cookieDict = splitCookieString(cookie_str);

    const ua = cookieDict[COOKIE_USER]
    const up = cookieDict[COOKIE_PWD]


    if (ua !== undefined && up !== undefined) {
        // send token to api server, if response 401 then delete cookie.
        

        return true;
    }

    return false;
}

// export function 