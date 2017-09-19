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

type Sort = {
  field: string;
  order: string;
};

type Redirect = {
  name: string;
  url: string;
};

type Banner = {
  products: {
    image_url: string;
    target_url: string;
  };
};

type Product = {
  id: string;
};

type Facet = {
  name: string;
  type: string;
  sort_type: string;
  values: FacetValue[];
};

type LineItem = {
  item_id: string;
  unit_price: number;
  quantity: number;
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

type AutocompleteSuggestion = {
  value: string;
  redirect: Redirect;
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

type AutocompleteRequestBody = {
  q: string;
  user?: User;
  suggestion_limit?: number;
  item_limit?: number;
};

type ResultsRequestBody = {
  user?: User;
  filters?: Filter[];
  sort?: Sort[];
  offset?: number;
  limit?: number;
};

type SearchRequestBody = ResultsRequestBody & {
  q: string;
};

type CollectionRequestBody = ResultsRequestBody;

type PredefinedRecommendationsRequestBody = {
  item_id?: number | string;
};

type CommonRecommendationsRequestBody = {
  offset?: number;
  limit?: number;
};

type RecommendationsRequestBody =
  | PredefinedRecommendationsRequestBody
  | CommonRecommendationsRequestBody;

type ClickSuggestionFeedbackRequestBody = {
  event: 'click-suggestion';
  properties: ClickSuggestionFeedbackRequest;
};

type ClickItemFeedbackRequestBody = {
  event: 'click-item';
  properties: ClickItemFeedbackRequest;
};

type RedirectFeedbackRequestBody = {
  event: 'redirect';
  properties: RedirectFeedbackRequest;
};

type PurchaseFeedbackRequestBody = {
  event: 'purchase';
  properties: PurchaseFeedbackRequest;
};

type UpdateCartFeedbackRequestBody = {
  event: 'update-cart';
  properties: UpdateCartFeedbackRequest;
};

type AddToCartFeedbackRequestBody = {
  event: 'add-to-cart';
  properties: AddToCartFeedbackRequest;
};

type ViewPageFeedbackRequestBody = {
  event: 'view-page';
  properties: ViewPageFeedbackRequest;
};

type FeedbackRequestBody =
  | ClickSuggestionFeedbackRequestBody
  | ClickItemFeedbackRequestBody
  | RedirectFeedbackRequestBody
  | PurchaseFeedbackRequestBody
  | UpdateCartFeedbackRequestBody
  | AddToCartFeedbackRequestBody
  | ViewPageFeedbackRequestBody;

type RequestBody =
  | AutocompleteRequestBody
  | ResultsRequestBody
  | FeedbackRequestBody
  | RecommendationsRequestBody;

type AutocompleteRequest = AutocompleteRequestBody;

type SearchRequest = SearchRequestBody & {
  q: string;
};

type CollectionRequest = CollectionRequestBody & {
  slot: string;
};

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
  line_items: LineItem[];
  affiliation?: string;
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

type PredefinedRecommendationsRequest = PredefinedRecommendationsRequestBody & {
  slot: string;
};

type NewestRecommendationsRequest = CommonRecommendationsRequestBody;

type TrendingRecommendationsRequest = CommonRecommendationsRequestBody;

type LatestRecommendationsRequest = CommonRecommendationsRequestBody;

type ViewedRecommendationsRequest = CommonRecommendationsRequestBody & {
  item_id: string | number;
};

type BoughtRecommendationsRequest = CommonRecommendationsRequestBody & {
  item_id: string | number;
};

type FrequentlyPurchasedRecommendationsRequest = CommonRecommendationsRequestBody & {
  item_ids: Array<string | number>;
};

type RecommendationsRequest =
  | PredefinedRecommendationsRequest
  | NewestRecommendationsRequest
  | TrendingRecommendationsRequest
  | LatestRecommendationsRequest
  | ViewedRecommendationsRequest
  | BoughtRecommendationsRequest
  | FrequentlyPurchasedRecommendationsRequest;

type AutocompleteResponse = {
  suggestions: AutocompleteSuggestion[];
  items: Product[];
  meta: {
    rid: string;
    q: string;
    suggestion_limit: number;
    item_limit: number;
  };
};

type ResultsResponse = {
  meta: {
    rid: string;
    filters: Filter[];
    sort: Sort[];
    limit: number;
    offset: number;
    total: number;
  };
  items: Product[];
  facets: Facet[];
};

type SearchResponse = ResultsResponse & {
  redirect: Redirect;
  banner: Banner;
};

type CollectionResponse = ResultsResponse;

type RecommendationsResponse = {
  meta: {
    rid: string;
    limit: number;
    offset: number;
    total: number;
    item_id?: string;
    user_id?: string;
  };
  items: Product[];
};

export {
  Config,
  User,
  RecommendationsType,
  FeedbackType,
  AutocompleteRequest,
  SearchRequest,
  CollectionRequest,
  RecommendationsRequest,
  PredefinedRecommendationsRequest,
  ViewedRecommendationsRequest,
  BoughtRecommendationsRequest,
  FrequentlyPurchasedRecommendationsRequest,
  FeedbackRequest,
  RequestBody,
  SearchRequestBody,
  CollectionRequestBody,
  ResultsRequestBody,
  AutocompleteResponse,
  SearchResponse,
  CollectionResponse,
  RecommendationsResponse,
  Product,
  AutocompleteSuggestion,
  Redirect,
  Filter,
  FilterValue,
  Facet,
  FacetValue,
  Banner,
  Sort,
};
