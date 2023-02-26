export const COOKIE_USER = "_cua";
export const COOKIE_PWD = "_cpwd"


export class ActionResult<T = Record<string, string>> {
    status: number = 400; 
    msg?: string;
    data?: T;
    
    public constructor(options: { status: number, msg?: string, data?: T }) {
        this.status = options.status;
        this.msg = options.msg;
        this.data = options.data;
    }

    public isOK(): boolean {
        return this.status >= 200 && this.status <= 299;
    }  
}

