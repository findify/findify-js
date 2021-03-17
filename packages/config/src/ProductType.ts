import { ProductPriceTemplate, ProductVariantsTemplate, ProductTemplate } from './enums';

export type ProductType = {

  /**
   * Product template
   * Custom string value could be used in you need to have
   * specific view in widget
   */
  template: keyof typeof ProductTemplate | string

  /**
   * Product price component display options
   */
  price: {
    display: boolean
		template: keyof typeof ProductPriceTemplate
  },

  /**
   * Title component display options 
   */
  title: {
    display: boolean
    /**
     * Max number of title lines to be shown
     * the rest of text will be cropped
     */
    lines: number
  },
  
  /**
   * Description component display options 
   */
  description: {
    display: boolean
    /**
     * Max number of title lines to be shown
     * the rest of text will be cropped
     */
    lines: number
  },
  
  /**
   * Reviews component display options 
   */
  reviews: {
    display: boolean
  },

  /**
   * Variants component display options
   */
  variants: {
    display: boolean
		template: keyof typeof ProductVariantsTemplate
  },
  
  /**
   * Image component display options
   */
  image: {
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
  },

  /**
   * Sticker component display options
   */
  stickers: {
    discount: boolean
    outOfStock: boolean
  }

}
