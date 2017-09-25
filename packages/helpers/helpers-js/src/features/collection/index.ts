import omit = require('lodash/omit');
import isEmpty = require('lodash/isEmpty');

import { Config, StateName } from '../../generic/types';

import {
  rootReducer,
  getLastAction,
  getRequestData,
  getResponseData,
  getResponseMeta,
} from './reducers';

import * as actions from './actions';
import * as validations from './validations';
import { rootSaga } from './sagas';
import { actionTypes } from './constants/actionTypes';
import { eventsNames } from './constants/eventsNames';
import { stateNames } from '../../generic/constants/stateNames';
import { runSafe } from '../../generic/utils/runSafe';
import { createEvent } from '../../generic/utils/createEvent';
import { createStore } from '../../generic/helpers/createStore';

// TODO: Eliminate code repeating in `search` and `collection` features.
// possible create something like `results` feature.
function create(slot: string, config: Config) {
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
        emit(event) {
          validations.emit(event);

          switch (event.name) {
            case eventsNames.clearAllFilters:
              reduxStore.dispatch(actions.clearAllFilters());
              break;
            case eventsNames.setRequestBody:
              reduxStore.dispatch(actions.setRequestBody(event.payload));
              break;
            case eventsNames.nextPage:
              reduxStore.dispatch(actions.nextPage());
              break;
            case eventsNames.prevPage:
              reduxStore.dispatch(actions.prevPage());
              break;
            case eventsNames.setPage:
              reduxStore.dispatch(actions.setPage(event.payload));
              break;
            case eventsNames.setSorting:
              reduxStore.dispatch(actions.setSorting(event.payload));
              break;
            case eventsNames.unsetSorting:
              reduxStore.dispatch(actions.unsetSorting(event.payload));
              break;
            case eventsNames.setNestedListFacet:
              reduxStore.dispatch(actions.setNestedListFacet(event.payload));
              break;
            case eventsNames.unsetNestedListFacet:
              reduxStore.dispatch(actions.unsetNestedListFacet(event.payload));
              break;
            case eventsNames.setTextFacet:
              reduxStore.dispatch(actions.setTextFacet(event.payload));
              break;
            case eventsNames.unsetTextFacet:
              reduxStore.dispatch(actions.unsetTextFacet(event.payload));
              break;
            case eventsNames.setRangeFacet:
              reduxStore.dispatch(actions.setRangeFacet(event.payload));
              break;
            case eventsNames.unsetRangeFacet:
              reduxStore.dispatch(actions.unsetRangeFacet(event.payload));
              break;
            case eventsNames.request:
              reduxStore.dispatch(
                actions.request({ ...event.payload, slot }, sdk),
              );
              break;
          }

          return this;
        },

        subscribe(listener) {
          return reduxStore.subscribe(() => {
            const action = getLastAction(reduxStore.getState());

            switch (action.type) {
              case actionTypes.SET_REQUEST_BODY:
                listener(createEvent(eventsNames.setRequestBody));
                break;
              case actionTypes.NEXT_PAGE:
                listener(createEvent(eventsNames.nextPage));
                break;
              case actionTypes.PREV_PAGE:
                listener(createEvent(eventsNames.prevPage));
                break;
              case actionTypes.SET_PAGE:
                listener(createEvent(eventsNames.setPage, action.payload));
                break;
              case actionTypes.SET_SORTING:
                listener(createEvent(eventsNames.setSorting, action.payload));
                break;
              case actionTypes.UNSET_SORTING:
                listener(createEvent(eventsNames.unsetSorting, action.payload));
                break;
              case actionTypes.SET_NESTED_LIST_FACET:
                listener(
                  createEvent(eventsNames.setNestedListFacet, action.payload),
                );
                break;
              case actionTypes.UNSET_NESTED_LIST_FACET:
                listener(
                  createEvent(eventsNames.unsetNestedListFacet, action.payload),
                );
                break;
              case actionTypes.SET_TEXT_FACET:
                listener(createEvent(eventsNames.setTextFacet, action.payload));
                break;
              case actionTypes.UNSET_TEXT_FACET:
                listener(
                  createEvent(eventsNames.unsetTextFacet, action.payload),
                );
                break;
              case actionTypes.SET_RANGE_FACET:
                listener(
                  createEvent(eventsNames.setRangeFacet, action.payload),
                );
                break;
              case actionTypes.UNSET_RANGE_FACET:
                listener(
                  createEvent(eventsNames.unsetRangeFacet, action.payload),
                );
                break;
              case actionTypes.REQUEST: {
                const payload = omit(action.payload, ['slot']);

                listener(
                  createEvent(
                    eventsNames.request,
                    !isEmpty(payload) ? payload : undefined,
                  ),
                );
                break;
              }
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

export { create };
