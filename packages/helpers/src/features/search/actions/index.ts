import * as FindifySDK from 'findify-sdk';

import { actionTypes } from '../constants/actionTypes';

export function clearAllFilters() {
  return {
    type: actionTypes.CLEAR_ALL_FILTERS,
  };
}

export function setRequestBody(payload: SetRequestBodyPayload) {
  return {
    type: actionTypes.SET_REQUEST_BODY,
    payload,
  };
}

export function search(payload: SearchPayload) {
  return {
    type: actionTypes.SEARCH,
    payload,
  };
}

export function request(payload: RequestPayload, sdk: FindifySDK.Client) {
  return {
    type: actionTypes.REQUEST,
    payload,
    service: {
      sdk,
    },
  };
}

export function nextPage() {
  return {
    type: actionTypes.NEXT_PAGE,
  };
}

export function prevPage() {
  return {
    type: actionTypes.PREV_PAGE,
  };
}

export function setPage(payload: SetPagePayload) {
  return {
    type: actionTypes.SET_PAGE,
    payload,
  };
}

export function setSorting(payload: SetSortingPayload) {
  return {
    type: actionTypes.SET_SORTING,
    payload,
  };
}

export function unsetSorting(payload: UnsetSortingPayload) {
  return {
    type: actionTypes.UNSET_SORTING,
    payload,
  };
}

export function setNestedListFacet(payload: GenericFacetPayload) {
  return {
    type: actionTypes.SET_NESTED_LIST_FACET,
    payload,
  };
}

export function unsetNestedListFacet(payload: GenericFacetPayload) {
  return {
    type: actionTypes.UNSET_NESTED_LIST_FACET,
    payload,
  };
}

export function setTextFacet(payload: GenericFacetPayload) {
  return {
    type: actionTypes.SET_TEXT_FACET,
    payload,
  };
}

export function unsetTextFacet(payload: GenericFacetPayload) {
  return {
    type: actionTypes.UNSET_TEXT_FACET,
    payload,
  };
}

export function setRangeFacet(payload: RangeFacetPayload) {
  return {
    type: actionTypes.SET_RANGE_FACET,
    payload,
  };
}

export function unsetRangeFacet(payload: RangeFacetPayload) {
  return {
    type: actionTypes.UNSET_RANGE_FACET,
    payload,
  };
}

export function responseSuccess(payload: ResponseSuccessPayload) {
  return {
    type: actionTypes.RESPONSE_SUCCESS,
    payload,
  };
}

export function responseFailure(payload: ResponseFailurePayload) {
  return {
    type: actionTypes.RESPONSE_FAILURE,
    payload,
  };
}

export type SetRequestBodyPayload = FindifySDK.CollectionRequest;

export type SearchPayload = {
  query: string;
};

export type RequestPayload = {
  limit?: number;
};

export type SetPagePayload = {
  page: number;
};

export type SetSortingPayload = {
  field: string;
  order: string;
};

export type UnsetSortingPayload = {
  field: string;
};

export type GenericFacetPayload = {
  name: string;
  value: string;
};

export type RangeFacetPayload = {
  from?: number;
  to?: number;
};

export type ResponseSuccessPayload = {
  response: FindifySDK.SearchResponse;
  receivedAt: number;
};

export type ResponseFailurePayload = {
  message: string;
};
