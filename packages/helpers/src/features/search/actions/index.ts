import * as FindifySDK from 'findify-sdk';

import { actionTypes } from '../constants/actionTypes';

function clearAllFilters() {
  return {
    type: actionTypes.CLEAR_ALL_FILTERS,
  };
}

function setRequestBody(payload: SetRequestBodyPayload) {
  return {
    type: actionTypes.SET_REQUEST_BODY,
    payload,
  };
}

function search(payload: SearchPayload) {
  return {
    type: actionTypes.SEARCH,
    payload,
  };
}

function request(payload: RequestPayload, sdk: FindifySDK.Client) {
  return {
    type: actionTypes.REQUEST,
    payload,
    service: {
      sdk,
    },
  };
}

function nextPage() {
  return {
    type: actionTypes.NEXT_PAGE,
  };
}

function prevPage() {
  return {
    type: actionTypes.PREV_PAGE,
  };
}

function setPage(payload: SetPagePayload) {
  return {
    type: actionTypes.SET_PAGE,
    payload,
  };
}

function setSorting(payload: SetSortingPayload) {
  return {
    type: actionTypes.SET_SORTING,
    payload,
  };
}

function unsetSorting(payload: UnsetSortingPayload) {
  return {
    type: actionTypes.UNSET_SORTING,
    payload,
  };
}

function setNestedListFacet(payload: GenericFacetPayload) {
  return {
    type: actionTypes.SET_NESTED_LIST_FACET,
    payload,
  };
}

function unsetNestedListFacet(payload: GenericFacetPayload) {
  return {
    type: actionTypes.UNSET_NESTED_LIST_FACET,
    payload,
  };
}

function setTextFacet(payload: GenericFacetPayload) {
  return {
    type: actionTypes.SET_TEXT_FACET,
    payload,
  };
}

function unsetTextFacet(payload: GenericFacetPayload) {
  return {
    type: actionTypes.UNSET_TEXT_FACET,
    payload,
  };
}

function setRangeFacet(payload: RangeFacetPayload) {
  return {
    type: actionTypes.SET_RANGE_FACET,
    payload,
  };
}

function unsetRangeFacet(payload: RangeFacetPayload) {
  return {
    type: actionTypes.UNSET_RANGE_FACET,
    payload,
  };
}

function responseSuccess(payload: ResponseSuccessPayload) {
  return {
    type: actionTypes.RESPONSE_SUCCESS,
    payload,
  };
}

function responseFailure(payload: ResponseFailurePayload) {
  return {
    type: actionTypes.RESPONSE_FAILURE,
    payload,
  };
}

type SetRequestBodyPayload = FindifySDK.CollectionRequest;

type SearchPayload = {
  query: string;
};

type RequestPayload = {
  limit?: number;
};

type SetPagePayload = {
  page: number;
};

type SetSortingPayload = {
  field: string;
  order: string;
};

type UnsetSortingPayload = {
  field: string;
};

type GenericFacetPayload = {
  name: string;
  value: string;
};

type RangeFacetPayload = {
  from?: number;
  to?: number;
};

type ResponseSuccessPayload = {
  response: FindifySDK.SearchResponse;
  receivedAt: number;
};

type ResponseFailurePayload = {
  message: string;
};

export {
  clearAllFilters,
  setRequestBody,
  search,
  request,
  nextPage,
  prevPage,
  setPage,
  setSorting,
  unsetSorting,
  setNestedListFacet,
  unsetNestedListFacet,
  setTextFacet,
  unsetTextFacet,
  setRangeFacet,
  unsetRangeFacet,
  responseSuccess,
  responseFailure,
};
