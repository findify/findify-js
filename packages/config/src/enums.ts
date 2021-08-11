export enum StoreStatus {
  'live' = 'live',
  'disabled' = 'disabled',
  'paused' = 'paused',
  'created' = 'created'
}

export enum Feature {
  'autocomplete' = 'autocomplete',
  'search' = 'search',
  'recommendation' = 'recommendation',
  'content' = 'content',
  'custom' = 'custom',
}

export enum Platform {
  'generic' = 'generic',
  'shopify' = 'shopify',
  'bigcommerce' = 'bigcommerce',
  'magento' = 'magento',
  'magento2' = 'magento2',
  'maropost' = 'maropost',
  'jetshop' = 'jetshop'
}

export enum AnalyticsEventKey {
  'view-page' = 'view-page',
  'purchase' = 'purchase',
  'update-cart' = 'update-cart',
  'click-item' = 'click-item',
  'add-to-cart' = 'add-to-cart'
}

export enum FilterType {
  'text' = 'text',
  'category' = 'category',
  'range' = 'range',
  'color' = 'color',
  'price' = 'price',
  'rating' = 'rating'
}

export enum ProductPriceTemplate {
  'min-max' = 'min-max',
  'from-min' = 'from-min',
  'to-max' = 'to-max',
}
export enum ProductVariantsTemplate {
  'radio' = 'radio',
  'select' = 'select',
  'text' = 'text'
}

export enum ProductTemplate {
  'vertical' = 'vertical',
  'horizontal' = 'horizontal'
}

export enum ContentTemplate {
  'vertical' = 'vertical',
  'horizontal' = 'horizontal'
}

/**
 * Autocomplete
 */
export enum AutocompleteRenderNode {
  'parent' = 'parent',
  'self' = 'self',
  'body' = 'body'
}

export enum AutocompleteTemplate {
  'dropdown' = 'dropdown',
  'sidebar' = 'sidebar',
  'fullscreen' = 'fullscreen',
  'fullscreen-with-input' = 'fullscreen-with-input'
}

export enum AutocompletePosition {
  'left' = 'left',
  'right' = 'right',
  'dynamic' = 'dynamic'
}

export enum SuggestionTemplate {
  'horizontal' = 'horizontal',
  'vertical' = 'vertical'
}

/**
 * Recommendation
 */
export enum RecommendationType {
  'trending' = 'trending',
  'newest' = 'newest',
  'viewedViewed' = 'viewedViewed',
  'viewed' = 'viewed',
  'viewedBought' = 'viewedBought',
  'purchasedTogether' = 'purchasedTogether',
  'featured' = 'featured'
}

export enum RecommendationTemplate {
  'slider' = 'slider',
  'grid' = 'grid'
}

/**
 * Search / Smart Collections
 */
export enum PaginationType {
  'lazy' = 'lazy',
  'static' = 'static'
}

export enum FacetsPosition {
  'left' = 'left',
  'right' = 'right',
  'top' = 'top'
}

export enum SearchOrder {
  default = '',
  asc = 'asc',
  desc = 'desc'
}
