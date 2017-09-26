import * as FindifySDK from '@findify/sdk';

declare module '@findify/helpers' {
  type Config = FindifySDK.Config;
  type Unsubscribe = () => void;
  type User = FindifySDK.User;

  type ResponseSuccessEvent = {
    name: 'responseSuccess';
  };
  type ResponseFailureEvent = {
    name: 'responseFailure';
  };

  type AutocompleteServerRequest = FindifySDK.AutocompleteRequest;
  type AutocompleteServerResponse = FindifySDK.AutocompleteResponse;

  type AutocompleteInputEvent = {
    name: 'input';
    payload: {
      query: string;
    };
  };
  type AutocompleteSetRequestBodyEvent = {
    name: 'setRequestBody';
    payload: AutocompleteServerRequest;
  };
  type AutocompleteRequestEvent = {
    name: 'request';
    payload?: {
      itemsLimit?: number;
      suggestionsLimit?: number;
      user?: User;
    };
  };
  type AutocompleteEmitEvent =
    | AutocompleteInputEvent
    | AutocompleteRequestEvent;

  type AutocompleteSubscribeEvent =
    | AutocompleteEmitEvent
    | ResponseSuccessEvent
    | ResponseFailureEvent;
  type AutocompleteSubscribeListener = (
    event: AutocompleteSubscribeEvent,
  ) => void;
  type AutocompleteStore = {
    emit: (event: AutocompleteEmitEvent) => AutocompleteStore;
    subscribe(listener: AutocompleteSubscribeListener): Unsubscribe;
    get(name: 'request'): AutocompleteServerRequest;
    get(name: 'response'): AutocompleteServerResponse;
  };

  function createAutocomplete(config: Config): AutocompleteStore;

  type ResultsNextPageEvent = {
    name: 'nextPage';
  };
  type ResultsPrevPageEvent = {
    name: 'prevPage';
  };
  type ResultsSetPageEvent = {
    name: 'setPage';
    payload: {
      page: number;
    };
  };
  type ResultsSetSortingEvent = {
    name: 'setSorting';
    payload: {
      field: string;
      order: string;
    };
  };
  type ResultsUnsetSortingEvent = {
    name: 'unsetSorting';
    payload: {
      field: string;
    };
  };
  type ResultsSetNestedListFacetEvent = {
    name: 'setNestedListFacet';
    payload: {
      name: string;
      value: string;
    };
  };
  type ResultsUnsetNestedListFacetEvent = {
    name: 'unsetNestedListFacet';
    payload: {
      name: string;
      value: string;
    };
  };
  type ResultsSetTextFacetEvent = {
    name: 'setTextFacetEvent';
    payload: {
      name: string;
      value: string;
    };
  };
  type ResultsUnsetTextFacetEvent = {
    name: 'unsetTextFacetEvent';
    payload: {
      name: string;
      value: string;
    };
  };
  type ResultsSetRangeFacetEvent = {
    name: 'setRangeFacetEvent';
    payload: {
      name: string;
      from?: number;
      to?: number;
    };
  };
  type ResultsUnsetRangeFacetEvent = {
    name: 'unsetRangeFacetEvent';
    payload: {
      name: string;
      from?: number;
      to?: number;
    };
  };
  type ResultsRequestEvent = {
    name: 'request';
    payload?: {
      limit?: number;
      user?: User;
    };
  };

  type SearchServerRequest = FindifySDK.SearchRequest;
  type SearchServerResponse = FindifySDK.SearchResponse;

  type SearchSearchEvent = {
    name: 'search';
    payload: {
      query: string;
    };
  };
  type SearchSetRequestBodyEvent = {
    name: 'setRequestBody';
    payload: SearchServerRequest;
  };
  type SearchNextPageEvent = ResultsNextPageEvent;
  type SearchPrevPageEvent = ResultsPrevPageEvent;
  type SearchSetPageEvent = ResultsSetPageEvent;
  type SearchSetSortingEvent = ResultsSetSortingEvent;
  type SearchUnsetSortingEvent = ResultsUnsetSortingEvent;
  type SearchSetNestedListFacetEvent = ResultsSetNestedListFacetEvent;
  type SearchUnsetNestedListFacetEvent = ResultsUnsetNestedListFacetEvent;
  type SearchSetTextFacetEvent = ResultsSetTextFacetEvent;
  type SearchUnsetTextFacetEvent = ResultsUnsetTextFacetEvent;
  type SearchSetRangeFacetEvent = ResultsSetRangeFacetEvent;
  type SearchUnsetRangeFacetEvent = ResultsUnsetRangeFacetEvent;
  type SearchRequestEvent = ResultsRequestEvent;

  type SearchEmitEvent =
    | SearchSearchEvent
    | SearchNextPageEvent
    | SearchPrevPageEvent
    | SearchSetPageEvent
    | SearchSetSortingEvent
    | SearchUnsetSortingEvent
    | SearchSetNestedListFacetEvent
    | SearchUnsetNestedListFacetEvent
    | SearchSetTextFacetEvent
    | SearchUnsetTextFacetEvent
    | SearchSetRangeFacetEvent
    | SearchUnsetRangeFacetEvent
    | SearchRequestEvent;
  type SearchSubscribeEvent =
    | SearchEmitEvent
    | ResponseSuccessEvent
    | ResponseFailureEvent;

  type SearchSubscribeListener = (event: SearchSubscribeEvent) => void;
  type SearchStore = {
    emit(event: SearchEmitEvent): SearchStore;
    subscribe(listener: SearchSubscribeListener): Unsubscribe;
    get(name: 'request'): SearchServerRequest;
    get(name: 'response'): SearchServerResponse;
  };

  function createSearch(config: Config): SearchStore;

  type CollectionServerRequest = FindifySDK.CollectionRequest;
  type CollectionServerResponse = FindifySDK.CollectionResponse;

  type CollectionSetRequestBodyEvent = {
    name: 'setRequestBody';
    payload: CollectionServerRequest;
  };
  type CollectionNextPageEvent = ResultsNextPageEvent;
  type CollectionPrevPageEvent = ResultsPrevPageEvent;
  type CollectionSetPageEvent = ResultsSetPageEvent;
  type CollectionSetSortingEvent = ResultsSetSortingEvent;
  type CollectionUnsetSortingEvent = ResultsUnsetSortingEvent;
  type CollectionSetNestedListFacetEvent = ResultsSetNestedListFacetEvent;
  type CollectionUnsetNestedListFacetEvent = ResultsUnsetNestedListFacetEvent;
  type CollectionSetTextFacetEvent = ResultsSetTextFacetEvent;
  type CollectionUnsetTextFacetEvent = ResultsUnsetTextFacetEvent;
  type CollectionSetRangeFacetEvent = ResultsSetRangeFacetEvent;
  type CollectionUnsetRangeFacetEvent = ResultsUnsetRangeFacetEvent;
  type CollectionRequestEvent = ResultsRequestEvent;

  type CollectionEmitEvent =
    | CollectionNextPageEvent
    | CollectionPrevPageEvent
    | CollectionSetPageEvent
    | CollectionSetSortingEvent
    | CollectionUnsetSortingEvent
    | CollectionSetNestedListFacetEvent
    | CollectionUnsetNestedListFacetEvent
    | CollectionSetTextFacetEvent
    | CollectionUnsetTextFacetEvent
    | CollectionSetRangeFacetEvent
    | CollectionUnsetRangeFacetEvent
    | CollectionRequestEvent;
  type CollectionSubscribeEvent =
    | CollectionEmitEvent
    | ResponseSuccessEvent
    | ResponseFailureEvent;

  type CollectionSubscribeListener = (event: CollectionSubscribeEvent) => void;
  type CollectionStore = {
    emit(event: CollectionEmitEvent): CollectionStore;
    subscribe(listener: CollectionSubscribeListener): Unsubscribe;
    get(name: 'request'): CollectionServerRequest;
    get(name: 'response'): CollectionServerResponse;
  };

  function createCollection(slot: string, config: Config): CollectionStore;

  type RecommendationServerRequest = FindifySDK.RecommendationsRequest;
  type RecommendationServerResponse = FindifySDK.RecommendationsResponse;

  type RecommendationSetRequestBodyEvent = {
    name: 'setRequestBody';
    payload: RecommendationServerRequest;
  };
  type RecommendationRequestEvent = RecommendationServerRequest;
  type RecommendationEmitEvent = RecommendationRequestEvent;
  type RecommendationSubscribeEvent =
    | RecommendationEmitEvent
    | ResponseSuccessEvent
    | ResponseFailureEvent;

  type RecommendationsType = FindifySDK.RecommendationsType;

  type RecommendationSubscribeListener = (
    event: RecommendationSubscribeEvent,
  ) => void;
  type RecommendationStore = {
    emit(event: RecommendationEmitEvent): RecommendationStore;
    subscribe(listener: RecommendationSubscribeListener): Unsubscribe;
    get(name: 'request'): RecommendationServerRequest;
    get(name: 'response'): RecommendationServerResponse;
  };

  function createRecommendation(
    type: RecommendationsType,
    config: Config,
  ): RecommendationStore;
}
