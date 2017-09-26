import * as FindifySDK from '@findify/sdk';

type SearchEvent = {
  name: 'search';
  payload: {
    query: string;
  };
};
type RequestEvent = {
  name: 'request';
  payload?: {
    limit?: number;
    user?: FindifySDK.User;
  };
};
type NextPageEvent = {
  name: 'nextPage';
};
type PrevPageEvent = {
  name: 'prevPage';
};
type SetPageEvent = {
  name: 'setPage';
  payload: {
    page: number;
  };
};
type SetSortingEvent = {
  name: 'setSorting';
  payload: {
    field: string;
    order: string;
  };
};
type UnsetSortingEvent = {
  name: 'unsetSorting';
  payload: {
    field: string;
  };
};
type SetNestedListFacetEvent = {
  name: 'setNestedListFacet';
  payload: {
    name: string;
    value: string;
  };
};
type UnsetNestedListFacetEvent = {
  name: 'unsetNestedListFacet';
  payload: {
    name: string;
    value: string;
  };
};
type SetTextFacetEvent = {
  name: 'setTextFacetEvent';
  payload: {
    name: string;
    value: string;
  };
};
type UnsetTextFacetEvent = {
  name: 'unsetTextFacetEvent';
  payload: {
    name: string;
    value: string;
  };
};
type SetRangeFacetEvent = {
  name: 'setRangeFacetEvent';
  payload: {
    name: string;
    from?: number;
    to?: number;
  };
};
type UnsetRangeFacetEvent = {
  name: 'unsetRangeFacetEvent';
  payload: {
    name: string;
    from?: number;
    to?: number;
  };
};

export {
  NextPageEvent,
  PrevPageEvent,
  SetPageEvent,
  SetSortingEvent,
  UnsetSortingEvent,
  SetNestedListFacetEvent,
  UnsetNestedListFacetEvent,
  SetTextFacetEvent,
  UnsetTextFacetEvent,
  SetRangeFacetEvent,
  UnsetRangeFacetEvent,
  RequestEvent,
  SearchEvent,
};
