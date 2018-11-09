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
   * Will rerender component
   * @prop [entity: object] - widget to hydrate
  */
  hydrate = 'hydrate',

  /**
   * Will navigate to search page with passed value as search query
   * @prop [value: string] - search query
  */
  search = 'search',

  /**
   *  Will rerender widget with new config
   * @prop [key: string|number] - widget key
   * @prop [config: Immutable.Map] - new config
  */
  updateConfig = 'updateConfig',

  /**
   * Input lost focus
   * @prop [key: string|number] - widget key
   * @prop [config: Immutable.Map]
   */
  autocompleteFocusLost = 'autocompleteFocusLost',

  /**
   * Invalidate widgets
   */
  invalidate = 'invalidate',

  /**
   * Mobile elements
   */
  showMobileFacets = 'showMobileFacets',
  showMobileSort = 'showMobileSort',
  hideMobileFacets = 'hideMobileFacets',
  hideMobileSort = 'hideMobileSort',

  /**
   * Calls when collection was not set up
   */
  collectionNotFound = 'collectionNotFound',
}
