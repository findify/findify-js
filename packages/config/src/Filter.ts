import * as enums from './enums'

export type Filter = {
  type: keyof typeof enums.FilterType
  label: string,
  initiallyCollapsed: boolean

  /**
   * CheckboxFacet specific option
   * Number of visible facet options before "show more" button clicked
   */
  maxItemsCount: number

  /**
   * Step for range input
   */
  precision: number

  /**
   * Show slider in range facets
   */
  slider: boolean
}
