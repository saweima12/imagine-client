export function setCookie(key: string, value: string) {
    const cookie_str = `${key}=${value}`;
    document.cookie = cookie_str;
}  

export function splitCookieString(cookie_str: string): Record<string, string> {
    // get cookie string & split by ;
    const parts = cookie_str.split(";");
    const rtn: Record<string, string>  = {}

    parts.forEach(item => {
        // note: Make sure the cookie is in the correct format
        if (item.indexOf("=") > -1) {
            const [key, value]  = item.split("=");    
            rtn[key.trim()] = value.trim();
        }
    })
    return rtn;
}
