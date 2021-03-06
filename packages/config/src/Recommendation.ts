import { BaseFeature } from './BaseFeature'
import { Breakpoints } from './Breakpoints'
import * as enums from './enums'

export interface Recommendation extends BaseFeature<'Recommendation'> {
  /**
   * If recommendation enabled
   */
  enabled: boolean,

  /**
   * Recommendation slot
   */
  slot: string,

  /**
   * Recommendation type
   */
  type: keyof typeof enums.RecommendationType,

  /**
   * Recommendation template
   */
  template: keyof typeof enums.RecommendationTemplate

  /**
   * Max amount of items in response
   */
  limit: number,

  /**
   * Min amount of items when widget should be rendered
   */
  minResultsToShow: number,

  /**
   * If `true` will pick all products from analytics
   * Required only for `purchasedTogether` type
   */
  multipleIds: boolean,


  /**
   * Widget title
   */
  title: string


  /**
   * Layout breakpoints definition 
   */
  breakpoints: {
    grid: Breakpoints
  }
}
