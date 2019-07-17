export type User = {
  uid: string;
  sid: string;
  exist: boolean;
  persist: boolean;
};

export type Config = {
  key: string;
  events: {};
  platform: {
    bigcommerce?: boolean;
    shopify?: boolean;
  };
};

export type LineItemData = {
  item_id: string;
  unit_price: number;
  quantity: number;
};

export type ClickSuggestionPublicEventRequest = {
  rid: string;
  suggestion: string;
};

export type ClickItemPublicEventRequest = {
  item_id: string;
  rid?: string;
};

export type RedirectPublicEventRequest = {
  rid: string;
  suggestion: string;
};

export  type PurchasePublicEventRequest = {
  order_id: string;
  currency: string;
  revenue: number;
  line_items: LineItemData[];
  affiliation?: string;
};

export type UpdateCartPublicEventRequest = {
  line_items: LineItemData[];
};

export type AddToCartPublicEventRequest = {
  item_id: string;
  rid?: string;
  quantity?: number;
};

export type ViewPagePublicEventRequest = {
  item_id?: string;
};

export  type ViewPageInternalEventRequest = ViewPagePublicEventRequest & {
  url: string;
  ref: string;
  width: number;
  height: number;
};

export type PublicEventRequest =
  | ClickSuggestionPublicEventRequest
  | ClickItemPublicEventRequest
  | RedirectPublicEventRequest
  | PurchasePublicEventRequest
  | UpdateCartPublicEventRequest
  | AddToCartPublicEventRequest
  | ViewPagePublicEventRequest;

export type IdsData = {
  item_id?: string;
  item_ids?: string[];
};

export type FiltersData = {
  name?: string;
  value?: any[];
};

export enum EventName {
  clickSuggestion = 'click-suggestion',
  clickItem = 'click-item',
  redirect = 'redirect',
  purchase = 'purchase',
  addToCart = 'add-to-cart',
  updateCart = 'update-cart',
  viewPage = 'view-page'
};

export interface Client {
  user: User;
  sendEvent(
    type: string,
    request?: any,
    useCookie?: boolean,
    endpoint?: string,
  ): void | Promise<any>;
  listen(callback?): void;
  state: any;
  invalidate: any
};

