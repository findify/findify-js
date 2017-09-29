import * as FindifySDK from 'findify-sdk';

import { actionTypes } from '../constants/actionTypes';

// make arguments as objects and declare types for actons?
export function input(payload: InputPayload): InputAction {
  return {
    type: actionTypes.INPUT,
    payload,
  };
}

export function setRequestBody(
  payload: SetRequestBodyPayload
): SetRequestBodyAction {
  return {
    type: actionTypes.SET_REQUEST_BODY,
    payload,
  };
}

export function request(
  payload: RequestPayload,
  sdk: FindifySDK.Client
): RequestAction {
  return {
    type: actionTypes.REQUEST,
    payload,
    service: {
      sdk,
    },
  };
}

export function requestTimeUpdate(
  payload: RequestTimeUpdatePayload
): RequestTimeUpdateAction {
  return {
    type: actionTypes.REQUEST_TIME_UPDATE,
    payload,
  };
}

export function responseSuccess(
  payload: ResponseSuccessPayload
): ResponseSuccessAction {
  return {
    type: actionTypes.RESPONSE_SUCCESS,
    payload,
  };
}

export function responseFailure(
  payload: ResponseFailurePayload
): ResponseFailureAction {
  return {
    type: actionTypes.RESPONSE_FAILURE,
    payload,
  };
}

export type InputAction = {
  type: string;
  payload: InputPayload;
};

export type SetRequestBodyAction = {
  type: string;
  payload: SetRequestBodyPayload;
};

export type RequestAction = {
  type: string;
  payload: RequestPayload;
  service: {
    sdk: FindifySDK.Client;
  };
};

export type RequestTimeUpdateAction = {
  type: string;
  payload: RequestTimeUpdatePayload;
};

export type ResponseSuccessAction = {
  type: string;
  payload: ResponseSuccessPayload;
};

export type ResponseFailureAction = {
  type: string;
  payload: ResponseFailurePayload;
};

export type InputPayload = {
  query: string;
};

export type SetRequestBodyPayload = FindifySDK.AutocompleteRequest;

export type RequestPayload = {
  item_limit?: number;
  suggestion_limit?: number;
  user?: FindifySDK.User;
};

export type RequestTimeUpdatePayload = {
  time: number;
};

export type ResponseSuccessPayload = {
  response: FindifySDK.AutocompleteResponse;
  receivedAt: number;
};

export type ResponseFailurePayload = {
  message: string;
};

export type Action =
  | InputAction
  | SetRequestBodyAction
  | RequestAction
  | RequestTimeUpdateAction
  | ResponseSuccessAction
  | ResponseFailureAction;
