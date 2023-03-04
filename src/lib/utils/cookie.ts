export function setCookie(key: string, value: string) {
    const cookie_str = `${key}=${value}`;
    document.cookie = cookie_str;
}  

export function setExpireCookie(key: string) {
    let date = new Date(0);
    const cookie_str = `${key}=; expires=${date.toUTCString()}; path=/`
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
