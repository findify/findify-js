import { LineItem } from '../common';
import { Type as RequestType } from './Type';
import { Base } from './params';

/**
 * Feedback request.
 */
export interface Request {
  type: RequestType.Feedback;
  /** Request parameters */
  params: Params;
}

/**
 * Feedback request parameters.
 * Contains information about user activity.
 */
export type Params =
  | ClickSuggestion
  | ClickItem
  | Redirect
  | Purchase
  | AddToCart
  | UpdateCart
  | ViewPage;

/**
 * Feedback event name.
 *
 * * [click-suggestion](https://findify.readme.io/reference#section-click-suggestion-event) - Click-suggestion event.
 * * [click-item](https://findify.readme.io/reference#section-click-item-event) - Click-item event.
 * * [redirect](https://findify.readme.io/reference#section-page-redirect-event) - Page redirect event.
 * * [purchase](https://findify.readme.io/reference#section-purchase-event) - Purchase event.
 * * [add-to-cart](https://findify.readme.io/reference#section-add-to-cart-event) - Add-to-cart event.
 * * [update-cart](https://findify.readme.io/reference#section-cart-event) - Cart event.
 * * [view-page](https://findify.readme.io/reference#section-page-view) - Page view event.
 */
export enum Event {
  ClickSuggestion = 'click-suggestion',
  ClickItem = 'click-item',
  Redirect = 'redirect',
  Purchase = 'purchase',
  AddToCart = 'add-to-cart',
  UpdateCart = 'update-cart',
  ViewPage = 'view-page',
}

/**
 * Click-suggestion event payload.
 */
export interface ClickSuggestion extends Base {
  event: Event.ClickSuggestion;
  /** Request id preceding the clickthrough */
  rid: string;
  /** Suggestion that is clicked */
  suggestion: string;
}

/**
 * Click-item event payload.
 */
export interface ClickItem extends Base {
  /** Event name */
  event: Event.ClickItem;
  /** Item ID clicked */
  item_id: string;
  /** Request id preceding the clickthrough */
  rid?: string;
}

/**
 * Page redirect event payload.
 */
export interface Redirect extends Base {
  /** Event name */
  event: Event.Redirect;
  /** Request id preceding the redirection */
  rid: string;
  /** Suggestion that leads to the redirection */
  suggestion: string;
}

/**
 * Purchase event payload.
 */
export interface Purchase extends Base {
  /** Event name */
  event: Event.Purchase;
  /** Order ID */
  order_id: string;
  /** Currency of the purchase */
  currency: string;
  /** Total revenue */
  revenue: number;
  /** Items in cart */
  line_items: LineItem[];
  /** Affiliation of the purchase */
  affiliation?: string;
}

/**
 * Add-to-cart event payload.
 */
export interface AddToCart extends Base {
  /** Event name */
  event: Event.AddToCart;
  /** Request ID preceding the add-to-cart */
  item_id: string;
  /** Item ID added to cart */
  rid?: string;
  /** Quantity added to cart, default = 1 */
  quantity?: number;
}

/**
 * Update-cart event payload.
 */
export interface UpdateCart extends Base {
  /** Event name */
  event: Event.UpdateCart;
  /** Items in cart */
  line_items: LineItem[];
}

/**
 * Page view event payload.
 */
export interface ViewPage extends Base {
  /** Event name */
  event: Event.ViewPage;
  /** URL of the page viewed */
  url: string;
  /** Referer of the page */
  ref: string;
  /** Width of the customer's browser */
  width: number;
  /** Height of the customer's browser */
  height: number;
  /** Item ID - only for product pages */
  item_id?: string;
}
