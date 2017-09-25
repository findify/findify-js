import * as expect from 'expect';
import deepFreeze = require('deep-freeze');
import rewire = require('rewire');

import { rootReducer } from '../../../../../src/features/autocomplete/reducers';
import { actionTypes } from '../../../../../src/features/autocomplete/constants/actionTypes';

const reducers = rewire('../../../../../src/features/autocomplete/reducers');

const requestDataReducer = reducers.__get__('requestDataReducer');
const responseDataReducer = reducers.__get__('responseDataReducer');
const responseMetaReducer = reducers.__get__('responseMetaReducer');
const lastActionReducer = reducers.__get__('lastActionReducer');

describe('autocomplete reducers', () => {
  describe('rootReducer', () => {
    it('should return initial state if previous state is not provided', () => {
      expect(rootReducer(undefined, {} as any)).toEqual({
        request: {
          data: {},
        },
        response: {
          meta: {
            isFetching: false,
          },
          data: {},
        },
        lastAction: {},
      });
    });
  });

  describe('requestDataReducer', () => {
    const prevState = {};

    deepFreeze(prevState);

    it('should handle INPUT action', () => {
      const query = 'test';

      expect(
        requestDataReducer(prevState, {
          type: actionTypes.INPUT,
          payload: {
            query,
          },
        }),
      ).toEqual({
        q: query,
      });
    });

    it('should handle REQUEST with optional params in payload', () => {
      const payload = {
        item_limit: 1,
        suggestion_limit: 4,
        user: {
          uid: 1,
          sid: 3,
        },
      };

      expect(
        requestDataReducer(prevState, {
          type: actionTypes.REQUEST,
          payload,
        }),
      ).toEqual({
        item_limit: payload.item_limit,
        suggestion_limit: payload.suggestion_limit,
        user: payload.user,
      });
    });

    it('should handle REQUEST without optional params in payload', () => {
      expect(
        requestDataReducer(prevState, {
          type: actionTypes.REQUEST,
        }),
      ).toEqual({});
    });
  });

  describe('responseDataReducer', () => {
    const prevState = {};

    deepFreeze(prevState);

    it('should handle RESPONSE_SUCCESS action', () => {
      const response = {
        key: 'someData',
      };

      expect(
        responseDataReducer(prevState, {
          type: actionTypes.RESPONSE_SUCCESS,
          payload: {
            response,
          },
        }),
      ).toEqual(response);
    });
  });

  describe('responseMetaReducer', () => {
    const prevState = {};

    deepFreeze(prevState);

    it('should handle REQUEST action', () => {
      expect(
        responseMetaReducer(prevState, {
          type: actionTypes.REQUEST,
          payload: {},
        }),
      ).toEqual({
        isFetching: true,
      });
    });

    it('should handle RESPONSE_SUCCESS action', () => {
      expect(
        responseMetaReducer(prevState, {
          type: actionTypes.RESPONSE_SUCCESS,
          payload: {
            response: {
              key: 'someData',
            },
            receivedAt: 1,
          },
        }),
      ).toEqual({
        isFetching: false,
        lastUpdated: 1,
      });
    });

    it('should handle RESPONSE_FAILURE action', () => {
      const message = 'test message';
      expect(
        responseMetaReducer(prevState, {
          type: actionTypes.RESPONSE_FAILURE,
          payload: {
            message,
          },
        }),
      ).toEqual({
        isFetching: false,
        error: message,
      });
    });
  });

  describe('lastActionReducer', () => {
    const prevState = {};

    deepFreeze(prevState);

    it('should handle any dispatched action and return it as state', () => {
      const action = {
        type: 'SOME_ACTION',
      };

      expect(lastActionReducer(prevState, action as any)).toEqual(action);
    });
  });
});
