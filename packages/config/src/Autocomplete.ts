import { BaseFeature } from './BaseFeature'
import * as enums from './enums'
import { ProductType } from './ProductType'
import { Breakpoints } from './Breakpoints';
import { ContentType } from './ContentType';

export type AutocompleteSizeType = {
  /**
   * Autocomplete grid layout
   * By this option you can describe position of blocks
   * inside autocomplete columns eq:
   * [
   *  ['suggestions', 'categories'] # first column
   *  ['products'] # second column
   * ]
   */
  layout: string[][]
  
  template: keyof typeof enums.AutocompleteTemplate,

  position?: keyof typeof enums.AutocompletePosition,

  /**
   * Display clickable background overlay
   */
  overlay: boolean,

  /**
   * @deprecated
   * Product matches options
   */
  productMatches?: {
    display: boolean
    limit: number
  }

  /**
   * @deprecated
   */
  product?: ProductType

  /**
   * Suggestions options
   */
  suggestions: {
    /** @deprecated */
    display: boolean
  
    limit: number
    template: keyof typeof enums.SuggestionTemplate
  }

  /**
   * Product matches options
   */
  products: {
    limit: number
    item: ProductType
  }

  /**
   * Content setup
   */
  content: {
    [contentProviderName: string]: {
      title: string
      limit: number
      item: ContentType
    }
  }

  /**
   * Layout breakpoints definition 
   */
  breakpoints: {
    /** @deprecated */
    grid: Breakpoints

    products: Breakpoints
    layout: Breakpoints
    [contentProviderName: string]: Breakpoints
  }
}

export interface Autocomplete extends Omit<BaseFeature<'Autocomplete'>, 'product'> {
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
  instant: boolean

  /**
  * Listen closest form submit event
  */
  handleFormSubmit: boolean

  /**
  * Shows trending suggestions when query is empty
  */
  enableTrendingSearches: boolean

  mobile: AutocompleteSizeType
  desktop: AutocompleteSizeType
}
