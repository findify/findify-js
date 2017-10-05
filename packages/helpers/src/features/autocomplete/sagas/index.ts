import { takeLatest, delay } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import { getRequestData } from '../reducers';
import { actionTypes } from '../constants/actionTypes';
import { makeCallApiSaga } from '../../../generic/sagas';

import { RequestAction, responseSuccess, responseFailure } from '../actions';

const callApiSaga = makeCallApiSaga(responseSuccess, responseFailure);

function* requestSaga() {
  yield takeLatest(actionTypes.REQUEST, function*(action) {
    const sdk = (action as any).service.sdk;
    const requestData = yield select(getRequestData);

    yield* callApiSaga(() => sdk.autocomplete(requestData));
  });
}

export function* rootSaga(): any {
  yield [requestSaga()];
}
