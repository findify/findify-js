import { Pagination } from '../common';
import { Type as RequestType } from './Type';
import { Base } from './params';

/**
 * Recommendations request.
 */
export interface Request {
  type: RequestType.Recommendations;
  /** Request parameters */
  params: Params;
}

/**
 * Recommendations request parameters.
 */
export type Params =
  | Slot
  | Newest
  | Trending
  | RecentlyViewed
  | AlsoViewed
  | AlsoBought
  | FrequentlyPurchasedTogether
  | Featured;

/**
 * Recommendations type.
 *
 * * [slot](https://findify.readme.io/v3/reference#recommendation-api-slot) - Get recommendation using pre-configured slot.
 * * [newest](https://findify.readme.io/v3/reference#recommendation-api-newest) - Provides latest products in your store.
 * * [trending](https://findify.readme.io/v3/reference#recommendation-api-trending) - Provides trending products in your store.
 *   The trending information is calculated based on user behaviour.
 * * [recently-viewed](https://findify.readme.io/v3/reference#recommendation-api-viewed-latest) - Provides products recently viewed by the current user.
 * * [also-viewed](https://findify.readme.io/v3/reference#recommendation-api-item-viewed-viewed) - Provides 'users who viewed this product, also viewed these products' recommendation.
 * * [also-bought](https://findify.readme.io/v3/reference#recommendation-api-item-viewed-bought) - Provides 'users who viewed this product, also bought these products' recommendation.
 * * [frequently-purchased-together](https://findify.readme.io/v3/reference#recommendation-api-item-bought-bought) - Provides 'frequently purchased together' recommendation.
 * * [featured](https://findify.readme.io/v3/reference#recommendation-api-featured) - Provides featured products in your store.
 */
export enum Type {
  Slot = 'slot',
  Newest = 'newest',
  Trending = 'trending',
  RecentlyViewed = 'recently-viewed',
  AlsoViewed = 'also-viewed',
  AlsoBought = 'also-bought',
  FrequentlyPurchasedTogether = 'frequently-purchased-together',
  Featured = 'featured',
}

/** Slot recommendations request parameters */
export interface Slot extends Base {
  /** Recommendations type */
  type: Type.Slot;
  /** Collection handle */
  slot: string;
  /** Array of product item IDs */
  item_ids: string[];
  /**  Offset of products items. Used in pagination */
  offset?: number;
}

/** Newest recommendations request parameters. */
export interface Newest extends Base, Pagination {
  /** Recommendations type */
  type: Type.Newest;
}

/** Treding recommendations request parameters. */
export interface Trending extends Base, Pagination {
  /** Recommendations type */
  type: Type.Trending;
}

/** Recently viewed recommendations request parameters. */
export interface RecentlyViewed extends Base, Pagination {
  /** Recommendations type */
  type: Type.RecentlyViewed;
}

/** Also-viwed recommendations request parameters. */
export interface AlsoViewed extends Base, Pagination {
  /** Recommendations type */
  type: Type.AlsoViewed;
  /** Product item ID */
  item_id: string;
}

/** Also-bought recommendations request parameters. */
export interface AlsoBought extends Base, Pagination {
  /** Recommendations type */
  type: Type.AlsoBought;
  /** Product item ID */
  item_id: string;
}

/** Frequently purchased together recommendations request parameters. */
export interface FrequentlyPurchasedTogether extends Base, Pagination {
  /** Recommendations type */
  type: Type.FrequentlyPurchasedTogether;
  /** Array of product item IDs */
  item_ids: string[];
}

/** Featured recommendations request parameters. */
export interface Featured extends Base, Pagination {
  /** Recommendations type */
  type: Type.Featured;
}
