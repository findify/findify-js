import { BaseFeature } from './BaseFeature'
import { Breakpoints } from './Breakpoints';
import * as enums from './enums'

export interface Content extends BaseFeature <'Content'> {
  /**
   * Pagination settings
   */
   pagination: {
    /** Type of pagination */
    type: keyof typeof enums.PaginationType,
    /** How many times will lazy load before show `Load more` button */
    autoLoadTimes: number // <- Lazy only
    /** Step between pages in pagination component eq: `< 1 [step] 3 [step] 5 >` */
    step: number // <- Static only
   },
  
  /**
   * Scroll top after items update setting
  */
  scrollTop: {
    enabled: boolean
    /** CSS selector of container you need to scroll to */
    selector: string
    /** +/- container`s offset */
    offset: number
  }


  /**
   * Layout breakpoints definition 
   */
  breakpoints: {
    grid: Breakpoints
    layout: Breakpoints
  }
}
