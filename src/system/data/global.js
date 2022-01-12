
export default class Global {

  /**
   * @type {Document}
   */
  static doc;
  
  /**
   * @type {NS}
   */
  static ns;

  /**
   * @type {UserInterfaceTheme}
   */
  static get theme() {
    return this.ns.ui.getTheme();
  }

  /**
   *  发送事件
   *  @type {(event: string, data: any) => void}
   */
  static sendEvent;
}