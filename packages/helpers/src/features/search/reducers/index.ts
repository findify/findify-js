import * as FindifySDK from 'findify-sdk';
import assign = require('lodash/assign');
import { combineReducers as combine } from 'redux';

import { ResponseMeta } from '../../../generic/types';
import { actionTypes } from '../constants/actionTypes';
import {
  State as RequestDataState,
  reducer as requestDataReducer,
} from './requestData';

function responseDataReducer(state: ResponseDataState = {}, action) {
  switch (action.type) {
    case actionTypes.RESPONSE_SUCCESS:
      return assign({}, state, action.payload.response);
    default:
      return state;
  }
}

function responseMetaReducer(
  state: ResponseMetaState = initialResponseMetaState,
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

function lastActionReducer(state = {}, action) {
  return action;
}

const initialResponseMetaState = {
  isFetching: false,
};

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

export type ResponseDataState = any;
export type ResponseMetaState = ResponseMeta;

export type State = {
  request: {
    data?: RequestDataState;
  };
  response: {
    meta: ResponseMetaState;
    data?: ResponseDataState;
  };
  lastAction: any;
};
