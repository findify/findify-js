import * as FindifySDK from '@findify/sdk';

import { actionTypes } from '../constants/actionTypes';

function setRequestBody(payload: SetRequestBodyPayload) {
  return {
    type: actionTypes.SET_REQUEST_BODY,
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

type SetRequestBodyPayload = FindifySDK.RecommendationsRequest;

type RequestPayload = {
  request: FindifySDK.RecommendationsRequest;
  type: FindifySDK.RecommendationsType;
  user?: FindifySDK.User;
};

type ResponseSuccessPayload = {
  response: FindifySDK.AutocompleteResponse;
  receivedAt: number;
};

type ResponseFailurePayload = {
  message: string;
};

export { setRequestBody, request, responseSuccess, responseFailure };
