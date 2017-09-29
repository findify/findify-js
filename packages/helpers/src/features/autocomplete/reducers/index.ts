import * as FindifySDK from 'findify-sdk';
import assign = require('lodash/assign');
import { combineReducers as combine } from 'redux';

import { Action } from '../actions';
import { ResponseMeta } from '../../../generic/types';
import { actionTypes } from '../constants/actionTypes';
import { makeObjectSafe } from '../../../generic/utils/makeObjectSafe';

function requestDataReducer(
  state: RequestDataState = initialRequestDataState,
  action
) {
  switch (action.type) {
    case actionTypes.INPUT:
      return assign({}, state, {
        q: action.payload.query,
      });
    case actionTypes.REQUEST:
      return assign(
        {},
        state,
        makeObjectSafe({
          item_limit: () => action.payload.item_limit,
          suggestion_limit: () => action.payload.suggestion_limit,
          user: () => action.payload.user,
        })
      );
    case actionTypes.SET_REQUEST_BODY:
      return assign({}, state, action.payload);
    default:
      return state;
  }
}

function responseDataReducer(
  state: ResponseDataState = initialResponseDataState,
  action
) {
  switch (action.type) {
    case actionTypes.RESPONSE_SUCCESS:
      return assign({}, state, action.payload.response);
    default:
      return state;
  }
}

function responseMetaReducer(
  state: ResponseMeta = initialResponseMetaState,
  action
) {
  switch (action.type) {
    case actionTypes.REQUEST:
      return assign({}, state, {
        isFetching: true,
      });
    case actionTypes.RESPONSE_SUCCESS:
      return assign({}, state, {
        lastUpdated: action.payload.receivedAt,
        isFetching: false,
      });
    case actionTypes.RESPONSE_FAILURE:
      return assign({}, state, {
        isFetching: false,
        error: action.payload.message,
      });
    default:
      return state;
  }
}

function lastActionReducer(
  state: Action = initialLastActionState,
  action: Action
) {
  return action;
}

const initialRequestDataState = {} as any;
const initialResponseDataState = {} as any;
const initialResponseMetaState = {
  isFetching: false,
};
const initialLastActionState = {} as any;

export const getRequestData = (state: State) => state.request.data;
export const getResponseData = (state: State) => state.response.data;
export const getResponseMeta = (state: State) => state.response.meta;
export const getLastAction = (state: State) => state.lastAction;

export const rootReducer = combine<State>({
  request: combine({
    data: requestDataReducer,
  }),
  response: combine({
    data: responseDataReducer,
    meta: responseMetaReducer,
  }),
  lastAction: lastActionReducer,
}) as any;

export type RequestDataState = FindifySDK.AutocompleteRequest;
export type ResponseDataState = FindifySDK.AutocompleteResponse;
export type ResponseMetaState = ResponseMeta;

export type State = {
  request: {
    data?: RequestDataState;
  };
  response: {
    meta: ResponseMetaState;
    data?: ResponseDataState;
  };
  lastAction: Action;
};
