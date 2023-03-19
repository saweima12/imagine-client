export enum EventCode {
  toggleDrawer = 'toggleDrawer',
}

export class EventEmitter {
  public static _event: Record<string, Array<any>> = {};

  public static dispatch(eventCode: string, params?: unknown) {
    if (!(eventCode in this._event)) return;

    const handlers = this._event[eventCode];
    handlers.forEach((handler) => handler(params));
  }

  public static subscribe(eventCode: string, handler: any) {
    if (!(eventCode in this._event)) this._event[eventCode] = [];
    this._event[eventCode].push(handler);
  }

  public static unsubscribe(eventCode: string, handler: any) {
    if (!(eventCode in this._event)) return;

    const pub = this._event[eventCode];
    this._event[eventCode] = pub.filter((item) => item != handler);
  }
}
