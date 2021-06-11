import * as enums from './enums'

export type ContentType = {

  /**
   * Content template
   * Custom string value could be used if you need to have
   * specific view in widget
   */
  template: keyof typeof enums.ContentTemplate | string

  /**
   * Title component display options 
   */
  title?: {
    /**
     * Max number of title lines to be shown
     * the rest of text will be cropped
     */
    lines: number
  },
  
  /**
   * Description component display options 
   */
  description?: {
    /**
     * Max number of title lines to be shown
     * the rest of text will be cropped
     */
    lines: number
  },
  
  /**
   * Image component display options
   */
  image?: {
    /** 
     * If number not set images will keep its original aspect
     * To make lazy loading work smoothly we should preserve aspect ratio
		 * 0 - by default
     */
    aspectRatio: number

    /**
     * If "true" images will be loaded just when they appear in view
     */
    lazy: boolean
    /**
     * Screen offset when images will start loading
     */
    lazyOffset: number
  }
}
