import { setCookie, setExpireCookie, splitCookieString } from "lib/utils";
import { getAuthInstance, authenticateLogin, checkAuthorized } from 'lib/api';
import { COOKIE_USER, COOKIE_PWD, ActionResult} from 'lib/types';
import { getUserInfo } from "lib/utils/user";


export async function userLogin(username: string, password:string): Promise<ActionResult> {

    const result = await authenticateLogin(username, password);

    if (result.isOK()) {
        setCookie(COOKIE_USER, username);
        setCookie(COOKIE_PWD, result.data?.token || "");
    }

    return result;
}

export async function checkUserAuthorized(): Promise<boolean> {
    // get cookie from browser.
    const {ua, up} = getUserInfo();

    if (ua !== undefined && up !== undefined) {
        // send token to api server, if response 401 then set cookie expired.
        const instance = getAuthInstance(ua, up);

        const result = await checkAuthorized(instance);
        if (!result.isOK())  {
            setExpireCookie(COOKIE_USER);
            setExpireCookie(COOKIE_PWD);
        }

        return true;
    }

    return false;
}
