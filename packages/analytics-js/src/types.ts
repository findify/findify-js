type User = {
  uid: string;
  sid: string;
  exist: boolean;
  persist: boolean;
};

type Config = {
  key: string;
  events?: {};
  platform?: {
    bigcommerce?: boolean;
    shopify?: boolean;
  };
};

type LineItemData = {
  item_id: string;
  unit_price: number;
  quantity: number;
};

type ClickSuggestionPublicEventRequest = {
  rid: string;
  suggestion: string;
};
type ClickItemPublicEventRequest = {
  item_id: string;
  rid?: string;
};
type RedirectPublicEventRequest = {
  rid: string;
  suggestion: string;
};
type PurchasePublicEventRequest = {
  order_id: string;
  currency: string;
  revenue: number;
  line_items: LineItemData[];
  affiliation?: string;
};
type UpdateCartPublicEventRequest = {
  line_items: LineItemData[];
};
type AddToCartPublicEventRequest = {
  item_id: string;
  rid?: string;
  quantity?: number;
};
type ViewPagePublicEventRequest = {
  item_id?: string;
};

type ClickSuggestionInternalEventRequest = ClickSuggestionPublicEventRequest;
type ClickItemInternalEventRequest = ClickItemPublicEventRequest;
type RedirectInternalEventRequest = RedirectPublicEventRequest;
type PurchaseInternalEventRequest = PurchasePublicEventRequest;
type UpdateCartInternalEventRequest = UpdateCartPublicEventRequest;
type AddToCartInternalEventRequest = AddToCartPublicEventRequest;
type ViewPageInternalEventRequest = ViewPagePublicEventRequest & {
  url: string;
  ref: string;
  width: number;
  height: number;
};

type PublicEventRequest =
  | ClickSuggestionPublicEventRequest
  | ClickItemPublicEventRequest
  | RedirectPublicEventRequest
  | PurchasePublicEventRequest
  | UpdateCartPublicEventRequest
  | AddToCartPublicEventRequest
  | ViewPagePublicEventRequest;

type InternalEventRequest =
  | ClickSuggestionInternalEventRequest
  | ClickItemInternalEventRequest
  | RedirectInternalEventRequest
  | PurchaseInternalEventRequest
  | UpdateCartInternalEventRequest
  | AddToCartInternalEventRequest
  | ViewPageInternalEventRequest;

type IdsData = {
  item_id?: string;
  item_ids?: string[];
};

type FiltersData = {
  name?: string;
  value?: any[];
};

type EventName =
  | 'click-suggestion'
  | 'click-item'
  | 'redirect'
  | 'purchase'
  | 'add-to-cart'
  | 'update-cart'
  | 'view-page';

type Client = {
  user: User;
  sendEvent(
    type: string,
    request?: any,
    useCookie?: boolean,
    endpoint?: string,
  ): void | Promise<{}>;
  listen(callback?): void;
  state(): any;
  initialize(): void;
};

export {
  User,
  Config,
  Client,
  EventName,
  PublicEventRequest,
  InternalEventRequest,
  IdsData,
  FiltersData,
  ClickSuggestionPublicEventRequest,
  ClickItemPublicEventRequest,
  RedirectPublicEventRequest,
  PurchasePublicEventRequest,
  UpdateCartPublicEventRequest,
  AddToCartPublicEventRequest,
  ViewPagePublicEventRequest,
};
