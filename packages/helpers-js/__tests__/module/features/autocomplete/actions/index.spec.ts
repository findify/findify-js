import * as expect from 'expect';

import { actionTypes } from '../../../../../src/features/autocomplete/constants/actionTypes';

import {
  input,
  request,
  requestTimeUpdate,
  responseSuccess,
  responseFailure,
} from '../../../../../src/features/autocomplete/actions';

describe('autocomplete actions', () => {
  it('should create INPUT action', () => {
    const query = 'test';
    expect(input({ query })).toEqual({
      type: actionTypes.INPUT,
      payload: {
        query,
      },
    });
  });

  it('should create REQUEST action', () => {
    const itemLimit = 1;
    const suggestionLimit = 2;
    const user = {
      key: 'someValue',
    };
    const sdkInstance: any = 'sdk';

    expect(
      request(
        {
          item_limit: itemLimit,
          suggestion_limit: suggestionLimit,
          user: user as any,
        },
        sdkInstance,
      ),
    ).toEqual({
      type: actionTypes.REQUEST,
      payload: {
        item_limit: itemLimit,
        suggestion_limit: suggestionLimit,
        user,
      },
      service: {
        sdk: sdkInstance,
      },
    });
  });

  it('should create REQUEST_TIME_UPDATE action', () => {
    const time = 4;
    expect(requestTimeUpdate({ time })).toEqual({
      type: actionTypes.REQUEST_TIME_UPDATE,
      payload: {
        time,
      },
    });
  });

  it('should handle RESPONSE_SUCCESS action', () => {
    const response = {
      key: 'someValue',
    };
    const receivedAt = 4;

    expect(
      responseSuccess({
        response: response as any,
        receivedAt,
      }),
    ).toEqual({
      type: actionTypes.RESPONSE_SUCCESS,
      payload: {
        response,
        receivedAt,
      },
    });
  });

  it('should handle RESPONSE_FAILURE action', () => {
    const message = 'test message';
    expect(responseFailure({ message })).toEqual({
      type: actionTypes.RESPONSE_FAILURE,
      payload: {
        message,
      },
    });
  });
});
