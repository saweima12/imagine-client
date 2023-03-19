export interface AuthResponse {
  token: string;
}

export class ActionResult<T = Record<string, string> | unknown> {
  status = 400;
  msg?: string;
  data?: T;

  public static New<T>(options: { status: number; msg?: string; data?: T }): ActionResult<T> {
    const result = new ActionResult<T>(options.status);
    result.msg = options.msg;
    result.data = options.data;
    return result;
  }

  public constructor(status: number) {
    this.status = status;
  }

  public isOK(): boolean {
    return this.status >= 200 && this.status <= 299;
  }
}
