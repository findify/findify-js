import { BaseFeature } from './BaseFeature'
import * as enums from './enums'

export interface Search extends BaseFeature<'Search'> {
  /**
  * If present - will render Recommendation widget with given type
  * if no results has been returned
  */
  zeroResultsType?: Exclude<keyof typeof enums.RecommendationType, 'bought' | 'purchasedTogether'>

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
   * Sorting options
   */
  sorting: {
    options: [{
      field: string | 'default'
      order: keyof typeof enums.SearchOrder
    }]
  }

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
   * Facets setup
   */
  facets: {
    /** Facets component position
     * `left` - on left from product matches
     * `top` - above
     * `right` - next to products (changes flex order)
     */
    position: keyof typeof enums.FacetsPosition

    /**
     * If `true` will stick facets container to top of window
     */
    sticky: boolean

    /**
     * Number of visible facet options before "show more" button clicked
     */
    collapsedItemsCount: number


    /**
     * Expand only one facet per time
     */
    accordion: boolean

    /**
     * Filters setup
     */
    filters: {
      [filterName: string]: {
        type: keyof typeof enums.FilterType
        label: string,
        initiallyCollapsed: boolean
      }
    },
  }
}
