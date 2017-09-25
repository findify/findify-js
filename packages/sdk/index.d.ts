import * as Promise from 'bluebird';

declare module 'findify-sdk' {
  type Client = {
    autocomplete(request: AutocompleteRequest): Promise<AutocompleteResponse>;
    search(request: SearchRequest): Promise<SearchResponse>;
    collection(request: CollectionRequest): Promise<CollectionResponse>;
    recommendations(
      type: RecommendationsType,
      request?: RecommendationsRequest,
    ): Promise<RecommendationsResponse>;
    feedback(type: FeedbackType, request: FeedbackRequest): Promise<void>;
  };
  type Config = {
    key: string;
    user?: User;
    method?: 'post' | 'jsonp';
    log?: boolean;
  };
  type User = {
    uid: string;
    sid: string;
    email?: string;
    ip?: string;
    ua?: string;
    lang?: string[];
  };
  type LineItem = {
    item_id: string;
    unit_price: number;
    quantity: number;
  };

  type RecommendationsType =
    | 'predefined'
    | 'newest'
    | 'trending'
    | 'featured'
    | 'latest'
    | 'viewed'
    | 'bought'
    | 'frequentlyPurchased';
  type FeedbackType =
    | 'click-suggestion'
    | 'click-item'
    | 'redirect'
    | 'purchase'
    | 'add-to-cart'
    | 'update-cart'
    | 'view-page';

  type AutocompleteRequest = {
    q: string;
    user?: User;
    suggestion_limit?: number;
    item_limit?: number;
  };
  type SearchRequest = {
    q: string;
    user?: User;
    filters?: Filter[];
    sort?: Sort[];
    offset?: number;
    limit?: number;
  };
  type CollectionRequest = {
    slot: string;
    user?: User;
    filters?: Filter[];
    sort?: Sort[];
    offset?: number;
    limit?: number;
  };
  type PredefinedRecommendationsRequest = {
    slot: string;
    item_id?: number | string;
  };
  type NewestRecommendationsRequest = {
    offset?: number;
    limit?: number;
  };
  type TrendingRecommendationsRequest = {
    offset?: number;
    limit?: number;
  };
  type LatestRecommendationsRequest = {
    offset?: number;
    limit?: number;
  };
  type ViewedRecommendationsRequest = {
    item_id: string | number;
    offset?: number;
    limit?: number;
  };
  type BoughtRecommendationsRequest = {
    item_id: string | number;
    offset?: number;
    limit?: number;
  };
  type FrequentlyPurchasedRecommendationsRequest = {
    item_ids: (string | number)[];
    offset?: number;
    limit?: number;
  };
  type RecommendationsRequest =
    | PredefinedRecommendationsRequest
    | NewestRecommendationsRequest
    | TrendingRecommendationsRequest
    | LatestRecommendationsRequest
    | ViewedRecommendationsRequest
    | BoughtRecommendationsRequest
    | FrequentlyPurchasedRecommendationsRequest;
  type ClickSuggestionFeedbackRequest = {
    rid: string;
    suggestion: string;
  };
  type ClickItemFeedbackRequest = {
    item_id: string;
    rid?: string;
  };
  type RedirectFeedbackRequest = {
    rid: string;
    suggestion: string;
  };
  type PurchaseFeedbackRequest = {
    order_id: string;
    currency: string;
    revenue: number;
    affiliation?: string;
    line_items: LineItem[];
  };
  type UpdateCartFeedbackRequest = {
    line_items: LineItem[];
  };
  type AddToCartFeedbackRequest = {
    item_id: string;
    rid?: string;
    quantity?: number;
  };
  type ViewPageFeedbackRequest = {
    url: string;
    ref: string;
    width: number;
    height: number;
    item_id?: string;
  };
  type FeedbackRequest =
    | ClickSuggestionFeedbackRequest
    | ClickItemFeedbackRequest
    | RedirectFeedbackRequest
    | PurchaseFeedbackRequest
    | UpdateCartFeedbackRequest
    | AddToCartFeedbackRequest
    | ViewPageFeedbackRequest;

  type AutocompleteResponse = {
    suggestions: AutocompleteSuggestion[];
    items: AutocompleteProduct[];
    meta: {
      rid: string;
      q: string;
      suggestion_limit: number;
      item_limit: number;
    };
  };
  type SearchResponse = {
    redirect: Redirect;
    banner: Banner;
    meta: {
      rid: string;
      filters: Filter[];
      sort: Sort[];
      limit: number;
      offset: number;
      total: number;
    };
    items: ResultsProduct[];
    facets: Facet[];
  };
  type CollectionResponse = {
    meta: {
      rid: string;
      filters: Filter[];
      sort: Sort[];
      limit: number;
      offset: number;
      total: number;
    };
    items: ResultsProduct[];
    facets: Facet[];
  };
  type RecommendationsResponse = {
    meta: {
      rid: string;
      limit: number;
      offset: number;
      total: number;
      item_id?: string;
      user_id?: string;
    };
    items: RecommendationsProduct[];
  };

  type ResultsProduct = {
    id: string;
  };
  type RecommendationsProduct = {
    id: string;
  };
  type AutocompleteSuggestion = {
    value: string;
    redirect: Redirect;
  };
  type AutocompleteProduct = {
    id: string;
    title: string;
    compare_at: number;
    price: number[];
    product_url: string;
    thumbnail_url: string;
    stickers?: {
      discount: boolean;
      'free-shipping': boolean;
      'in-stock': boolean;
      'out-of-stock': boolean;
    };
  };
  type Redirect = {
    name: string;
    url: string;
  };
  type Filter = {
    name: string;
    type: string;
    values?: FilterValue[];
  };
  type FilterValue = {
    value?: string;
    from?: string;
    to?: string;
  };
  type Facet = {
    name: string;
    type: string;
    sort_type: string;
    values: FacetValue[];
  };
  type FacetValue = {
    selected: boolean;
    value: string;
    count: number;
    name: string;
    has_children: boolean;
    min: number;
    max: number;
    from: number;
    to: number;
    children: FacetValue[];
  };
  type Sort = {
    field: string;
    order: string;
  };
  type Banner = {
    products: {
      image_url: string;
      target_url: string;
    };
  };

  function init(config: Config): Client;
}
