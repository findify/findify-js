import { Breakpoints } from './Breakpoints';
import { ContentType } from './ContentType';
import * as Request from '@findify/sdk/lib/request'

import * as enums from './enums'

export interface Content {
  defaultRequestParams: Request.Content.Params,

  title: string,

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

  item: ContentType

  /**
   * Layout breakpoints definition 
   */
  breakpoints: {
    grid: Breakpoints
  }
}
