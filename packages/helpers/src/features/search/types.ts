import * as FindifySDK from 'findify-sdk';

export type SearchEvent = {
  name: 'search';
  payload: {
    query: string;
  };
};

export type NextPageEvent = {
  name: 'nextPage';
};

export type PrevPageEvent = {
  name: 'prevPage';
};

export type SetPageEvent = {
  name: 'setPage';
  payload: {
    page: number;
  };
};

export type SetSortingEvent = {
  name: 'setSorting';
  payload: {
    field: string;
    order: string;
  };
};

export type UnsetSortingEvent = {
  name: 'unsetSorting';
  payload: {
    field: string;
  };
};

export type SetNestedListFacetEvent = {
  name: 'setNestedListFacet';
  payload: {
    name: string;
    value: string;
  };
};

export type UnsetNestedListFacetEvent = {
  name: 'unsetNestedListFacet';
  payload: {
    name: string;
    value: string;
  };
};

export type SetTextFacetEvent = {
  name: 'setTextFacetEvent';
  payload: {
    name: string;
    value: string;
  };
};

export type UnsetTextFacetEvent = {
  name: 'unsetTextFacetEvent';
  payload: {
    name: string;
    value: string;
  };
};

export type SetRangeFacetEvent = {
  name: 'setRangeFacetEvent';
  payload: {
    name: string;
    from?: number;
    to?: number;
  };
};

export type UnsetRangeFacetEvent = {
  name: 'unsetRangeFacetEvent';
  payload: {
    name: string;
    from?: number;
    to?: number;
  };
};

export type RequestEvent = {
  name: 'request';
  payload?: {
    limit?: number;
    user?: FindifySDK.User;
  };
};
