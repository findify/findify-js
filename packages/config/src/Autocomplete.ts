import { BaseFeature } from './BaseFeature'
import * as enums from './enums'
import { ProductType } from './ProductType'
import { Breakpoints } from './Breakpoints';

export type AutocompleteSizeType = {
  template: keyof typeof enums.AutocompleteTemplate,

  position?: keyof typeof enums.AutocompletePosition,

  /**
   * Display clickable background overlay
   */
  overlay: boolean,

  /**
   * Suggestions options
   */
  suggestions: {
    display: boolean
  }

  /**
   * Product matches options
   */
  productMatches: {
    display: boolean
  }

  product: ProductType

  /**
   * Layout breakpoints definition 
   */
  breakpoints: {
    grid: Breakpoints
  }
}
export interface Autocomplete extends Omit<BaseFeature<'Autocomplete'>, 'product' | 'breakpoints'> {
  /**
   * Node where widget should be rendered in
   * - parent - Parent node
   * - self - Dynamically created widget node
   * - body - Document.Body
  */
  renderIn: keyof typeof enums.AutocompleteRenderNode,

  /**
   * If value set to `true` and current page is "Search Results", then autocomplete will
   * try to update search widget rather then send request for suggestions
   */
  instant: boolean,

  /**
  * Listen closest form submit event
  */
  handleFormSubmit: boolean,

  /**
  * Shows trending suggestions when query is empty
  */
  enableTrendingSearches: boolean,

  mobile: AutocompleteSizeType,
  desktop: AutocompleteSizeType
}
