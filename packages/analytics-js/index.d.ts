declare module 'findify-analytics' {
  type User = {
    uid: string;
    sid: string;
  };
  type Config = {
    key: string;
  };

  type LineItemData = {
    item_id: string;
    unit_price: number;
    quantity: number;
  };

  type ClickSuggestionEventRequest = {
    rid: string;
    suggestion: string;
  };
  type ClickItemEventRequest = {
    item_id: string;
    rid?: string;
  };
  type RedirectEventRequest = {
    rid: string;
    suggestion: string;
  };
  type PurchaseEventRequest = {
    order_id: string;
    currency: string;
    revenue: number;
    affiliation?: string;
    line_items: LineItemData[];
  };
  type UpdateCartEventRequest = {
    line_items: LineItemData[];
  };
  type AddToCartEventRequest = {
    item_id: string;
    rid?: string;
    quantity?: number;
  };
  type ViewPageEventRequest = {
    url: string;
    ref: string;
    width: number;
    height: number;
    item_id?: string;
  };

  type Client = {
    getUser(): User;
    sendEvent(type: 'click-suggestion', request: ClickSuggestionEventRequest);
    sendEvent(type: 'click-item', request: ClickItemEventRequest);
    sendEvent(type: 'redirect', request: RedirectEventRequest);
    sendEvent(type: 'purchase', request: PurchaseEventRequest);
    sendEvent(type: 'add-to-cart', request: AddToCartEventRequest);
    sendEevnt(type: 'update-cart', request: UpdateCartEventRequest);
    sendEvent(type: 'view-page', request?: ViewPageEventRequest);
  };

  function init(config: Config): Client;
}
