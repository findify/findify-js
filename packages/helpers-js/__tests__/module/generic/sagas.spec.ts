import * as expect from 'expect';
import * as Promise from 'bluebird';
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { makeCallApiSaga } from '../../../src/generic/sagas';

describe('generic sagas', () => {
  describe('makeCallApiSaga', () => {
    const serverResponse = 'responseData';
    const success = payload => ({ type: 'success', payload });
    const failure = payload => ({ type: 'failure', payload });
    const callApiSaga = makeCallApiSaga(success, failure);

    it('should yield "request" function and yield success action with response to "put" effect', () => {
      const payload = { response: serverResponse };
      const request: any = () => Promise.resolve(serverResponse);
      const gen = callApiSaga(request);

      expect(gen.next().value).toEqual(call(request));

      const putData = gen.next(serverResponse).value;
      expect(putData.PUT.action.payload.receivedAt).toBeA('number');
      delete putData.PUT.action.payload.receivedAt;

      expect(putData).toEqual(put(success(payload)));
      expect(gen.next().done).toBeTruthy();
    });

    it('should retry 3 times on failed response, otherwise yield "put" effect with failure action', () => {
      const error = new Error('test message');

      (error as any).config = {
        method: 'GET',
      };

      const request: any = () => error;
      const gen = callApiSaga(request);

      expect(gen.next().value).toEqual(call(request));
      expect(gen.throw(error).value).toEqual(call(delay, 1000));

      expect(gen.next().value).toEqual(call(request));
      expect(gen.throw(error).value).toEqual(call(delay, 1000));

      expect(gen.next().value).toEqual(call(request));
      expect(gen.throw(error).value).toEqual(
        put(failure({ message: 'test message' })),
      );
      expect(gen.next().done).toBeTruthy();
    });

    it('should yield "put" effect with failure action if non-network error was occured', () => {
      const error = new Error('test message');
      const request: any = () => error;
      const gen = callApiSaga(request);

      expect(gen.next().value).toEqual(call(request));
      expect(gen.throw(error).value).toEqual(
        put(failure({ message: 'test message' })),
      );
      expect(gen.next().done).toBeTruthy();
    });
  });
});
