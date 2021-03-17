export enum StoreStatus {
  live = 'live',
  disabled = 'disabled',
  stopped = 'stopped'
}

export enum Feature {
  autocomplete = 'autocomplete',
  search = 'search',
  recommendation = 'recommendation',
  content = 'content',
  custom = 'custom',
}

export enum Platform {
  generic = 'generic',
  shopify = 'shopify',
  bigcommerce = 'bigcommerce',
  magento = 'magento'
}

export enum AnalyticsEventKey {
  viewPage = 'view-page',
  purchase = 'purchase',
  updateCart = 'update-cart',
  clickItem = 'click-item',
}

export enum FilterType {
  text = 'text',
  category = 'category',
  range = 'range',
  color = 'color',
  price = 'price'
}

export enum ProductPriceTemplate {
  minMax = 'min-max',
  fromMin = 'from-min',
  toMax = 'to-max',
}
export enum ProductVariantsTemplate {
  switcher = 'switcher',
  select = 'select',
  text = 'text'
}

export enum ProductTemplate {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

/**
 * Autocomplete
 */
export enum AutocompleteRenderNode {
  parent = 'parent',
  self = 'self',
  body = 'body'
}

export enum AutocompleteTemplate {
  dropdown = 'dropdown',
  sidebar = 'sidebar',
  fullscreen = 'fullscreen'
}

export enum AutocompletePosition {
  left = 'left',
  right = 'right'
}

/**
 * Recommendation
 */
export enum RecommendationType {
  trending = 'trending',
  newest = 'newest',
  latest = 'latest',
  viewed = 'viewed',
  bought = 'bought',
  purchasedTogether = 'purchasedTogether',
  featured = 'featured'
}

export enum RecommendationTemplate {
  slider = 'slider',
  grid = 'grid'
}

/**
 * Search / Smart Collections
 */
export enum PaginationType {
  lazy = 'lazy',
  static = 'static'
}

export enum FacetsPosition {
  left = 'left',
  right = 'right',
  top = 'top'
}

export enum SearchOrder {
  default = '',
  asc = 'asc',
  desc = 'desc'
}
