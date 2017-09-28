import * as FindifySDK from 'findify-sdk';
import get = require('lodash/get');

import { RequestEvent } from './types';

import {
  Config,
  StateName,
  SubscribeListener,
  ResponseSuccessEvent,
  ResponseFailureEvent,
} from '../../generic/types';

import { request, setRequestBody } from './actions';

import {
  rootReducer,
  getLastAction,
  getRequestData,
  getResponseData,
  getResponseMeta,
} from './reducers';

import * as validations from './validations';
import { rootSaga } from './sagas';
import { actionTypes } from './constants/actionTypes';
import { eventsNames } from './constants/eventsNames';
import { runSafe } from '../../generic/utils/runSafe';
import { isExists } from '../../generic/utils/isExists';
import { stateNames } from '../../generic/constants/stateNames';
import { createEvent } from '../../generic/utils/createEvent';
import { createStore } from '../../generic/helpers/createStore';

function create(type: FindifySDK.RecommendationsType, config: Config) {
  return createStore(
    {
      rootReducer,
      rootSaga,
      config,
      eventsNames,
      stateNames,
    },
    (reduxStore, sdk) => {
      validations.init(type);

      return {
        emit(event) {
          validations.emit(type, event);

          switch (event.name) {
            case eventsNames.setRequestBody:
              reduxStore.dispatch(setRequestBody(event.payload));
              break;
            case eventsNames.request:
              reduxStore.dispatch(
                request(
                  {
                    request: event.payload,
                    user: get(event, 'payload.user') as any,
                    type,
                  },
                  sdk
                )
              );
              break;
          }

          return this;
        },
        subscribe(listener: SubscribeListener<SubscribeEvent>) {
          return reduxStore.subscribe(() => {
            const action = getLastAction(reduxStore.getState());

            switch (action.type) {
              case actionTypes.SET_REQUEST_BODY:
                listener(
                  createEvent(eventsNames.setRequestBody, action.payload)
                );
                break;
              case actionTypes.REQUEST:
                listener(createEvent(eventsNames.request, action.payload));
                break;
              case actionTypes.RESPONSE_SUCCESS:
                listener(createEvent(eventsNames.responseSuccess));
                break;
              case actionTypes.RESPONSE_FAILURE:
                listener(createEvent(eventsNames.responseFailure));
                break;
            }
          });
        },
        get(name: StateName) {
          const state = reduxStore.getState();

          switch (name) {
            case stateNames.request:
              return runSafe(() => getRequestData(state));
            case stateNames.response:
              return runSafe(() => getResponseData(state));
            case stateNames.responseMeta:
              return runSafe(() => getResponseMeta(state));
          }
        },
      };
    }
  );
}

type EmitEvent = RequestEvent;

type SubscribeEvent = EmitEvent | ResponseSuccessEvent | ResponseFailureEvent;

export { create };
