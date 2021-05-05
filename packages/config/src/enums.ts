export enum StoreStatus {
  'live',
  'disabled',
  'paused',
  'created'
}

export enum Feature {
  'autocomplete',
  'search',
  'recommendation',
  'content',
  'custom',
}

export enum Platform {
  'generic',
  'shopify',
  'bigcommerce',
  'magento',
  'magento2',
  'neto',
  'jetshop'
}

export enum AnalyticsEventKey {
  'view-page',
  'purchase',
  'update-cart',
  'click-item',
  'add-to-cart'
}

export enum FilterType {
  'text',
  'category',
  'range',
  'color',
  'price',
  'rating'
}

export enum ProductPriceTemplate {
  'min-max',
  'from-min',
  'to-max',
}
export enum ProductVariantsTemplate {
  'radio',
  'select',
  'text'
}

export enum ProductTemplate {
  'vertical',
  'horizontal'
}

/**
 * Autocomplete
 */
export enum AutocompleteRenderNode {
  'parent',
  'self',
  'body'
}

export enum AutocompleteTemplate {
  'dropdown',
  'sidebar',
  'fullscreen',
  'fullscreen-with-input'
}

export enum AutocompletePosition {
  'left',
  'right'
}

export enum SuggestionTemplate {
  'horizontal',
  'vertical'
}

/**
 * Recommendation
 */
export enum RecommendationType {
  'trending',
  'newest',
  'viewedViewed',
  'viewed',
  'viewedBought',
  'purchasedTogether',
  'featured'
}

export enum RecommendationTemplate {
  'slider',
  'grid'
}

/**
 * Search / Smart Collections
 */
export enum PaginationType {
  'lazy',
  'static'
}

export enum FacetsPosition {
  'left',
  'right',
  'top'
}

export enum SearchOrder {
  default = '',
  asc = 'asc',
  desc = 'desc'
}
