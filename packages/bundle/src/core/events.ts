export enum Events {
  /** 
   *  Creates new widget
   *  @prop [selector: string] - Element where to inject widget
   *  @prop [type: string] - Type of widget
   *  @prop [config: object] - Config which will extend base config
   */
  attach = 'attachWidget',

  /** 
   * Removes exist widget
   * @prop [entity: object] - widget to remove
  */
  detach = 'detachWidget',

  /** 
   * Will navigate to search page with passed value as search query
   * @prop [value: string] - search query
  */
  search = 'search',

  /** 
   * Will rerender widget
   * @prop [key: string|number] - widget key
  */
  forceUpdate = 'forceUpdate'
}
