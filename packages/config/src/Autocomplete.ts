import { BaseFeature } from './BaseFeature'
import * as enums from './enums'

interface AutocompleteTemplate extends BaseFeature<'Autocomplete'> {
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

  /**
   * Node where widget should be rendered in
   * - parent - Parent node
   * - self - Dynamically created widget node
   * - body - Document.Body
  */
  renderIn: keyof typeof enums.AutocompleteRenderNode,
  /**
   * Autocomplete alignment
   */
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
}

export interface Autocomplete {
  template: {
		mobile: keyof typeof enums.AutocompleteTemplate
		desktop: keyof typeof enums.AutocompleteTemplate
  }

  dropdown: AutocompleteTemplate,

  sidebar: AutocompleteTemplate,

  fullscreen: AutocompleteTemplate
}
