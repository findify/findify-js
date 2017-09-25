import { InputEvent, SetRequestBodyEvent, RequestEvent } from './types';

import {
  Config,
  StateName,
  SubscribeListener,
  ResponseSuccessEvent,
  ResponseFailureEvent,
} from '../../generic/types';

import {
  input,
  setRequestBody,
  request,
  InputAction,
  SetRequestBodyAction,
  RequestAction,
} from './actions';

import {
  rootReducer,
  getLastAction,
  getRequestData,
  getResponseData,
  getResponseMeta,
} from './reducers';

import { rootSaga } from './sagas';
import { actionTypes } from './constants/actionTypes';
import { eventsNames } from './constants/eventsNames';
import { runSafe } from '../../generic/utils/runSafe';
import { isExists } from '../../generic/utils/isExists';
import { stateNames } from '../../generic/constants/stateNames';
import { createEvent } from '../../generic/utils/createEvent';
import { createStore } from '../../generic/helpers/createStore';

// avoid names duplication between redux state/store and lib state/store

function create(config: Config) {
  return createStore(
    {
      rootReducer,
      rootSaga,
      config,
      eventsNames,
      stateNames,
    },
    (reduxStore, sdk) => {
      return {
        emit(event: EmitEvent) {
          if (
            event.name === eventsNames.input &&
            (!isExists(event.payload) ||
              !isExists((event as InputEvent).payload.query))
          ) {
            throw new Error('"query" param is required in "input" event');
          }

          switch (event.name) {
            case eventsNames.input:
              reduxStore.dispatch(input((event as InputEvent).payload));
              break;
            case eventsNames.setRequestBody:
              reduxStore.dispatch(
                setRequestBody((event as SetRequestBodyEvent).payload),
              );
              break;
            case eventsNames.request:
              reduxStore.dispatch(
                request((event as RequestEvent).payload, sdk),
              );
              break;
          }

          return this;
        },
        subscribe(listener: SubscribeListener<SubscribeEvent>) {
          return reduxStore.subscribe(() => {
            const action = getLastAction(reduxStore.getState());

            switch (action.type) {
              case actionTypes.INPUT:
                listener(
                  createEvent(
                    eventsNames.input,
                    (action as InputAction).payload,
                  ),
                );
                break;
              case actionTypes.SET_REQUEST_BODY:
                listener(
                  createEvent(
                    eventsNames.setRequestBody,
                    (action as SetRequestBodyAction).payload,
                  ),
                );
                break;
              case actionTypes.REQUEST:
                listener(
                  createEvent(
                    eventsNames.request,
                    (action as RequestAction).payload,
                  ),
                );
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
    },
  );
}

type EmitEvent = InputEvent | SetRequestBodyEvent | RequestEvent;

type SubscribeEvent = EmitEvent | ResponseSuccessEvent | ResponseFailureEvent;

export { create };
