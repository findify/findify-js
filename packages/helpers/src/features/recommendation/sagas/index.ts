import get = require('lodash/get');
import { takeLatest, delay } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import { getRequestData } from '../reducers';
import { actionTypes } from '../constants/actionTypes';
import { makeCallApiSaga } from '../../../generic/sagas';
import { cleanObject } from '../../../generic/utils/cleanObject';

import { responseSuccess, responseFailure } from '../actions';

const callApiSaga = makeCallApiSaga(responseSuccess, responseFailure);

function* requestSaga() {
  yield takeLatest(actionTypes.REQUEST, function*(action: any) {
    const sdk = action.service.sdk;
    const requestData = yield select(getRequestData);

    yield* callApiSaga(() =>
      sdk.recommendations(
        action.payload.type,
        cleanObject({
          ...requestData.request,
          user: get(requestData, 'user'),
        })
      )
    );
  });
}

export function* rootSaga(): any {
  yield [requestSaga()];
}
