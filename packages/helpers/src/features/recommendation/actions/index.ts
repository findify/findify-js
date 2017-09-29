import * as FindifySDK from 'findify-sdk';

import { actionTypes } from '../constants/actionTypes';

export function setRequestBody(payload: SetRequestBodyPayload) {
  return {
    type: actionTypes.SET_REQUEST_BODY,
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

export type SetRequestBodyPayload = FindifySDK.RecommendationsRequest;

export type RequestPayload = {
  request: FindifySDK.RecommendationsRequest;
  type: FindifySDK.RecommendationsType;
  user?: FindifySDK.User;
};

export type ResponseSuccessPayload = {
  response: FindifySDK.AutocompleteResponse;
  receivedAt: number;
};

export type ResponseFailurePayload = {
  message: string;
};
