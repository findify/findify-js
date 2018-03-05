export enum Events {
  /** 
   *  Creates new entity
   *  @prop [selector: string] - Element where to inject widget
   *  @prop [type: string] - Type of widget
   *  @prop [config: object] - Config which will extend base config
   */
  attach = 'attachEntity',

  /** 
   * Removes exist entity
   * @prop [entity: object] - Entity to remove
  */
  detach = 'detachEntity',

  /** 
   * Will navigate to search page with passed value as search query
   * @prop [value: string] - search query
  */
  search = 'search'
}
