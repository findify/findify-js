import isEqual = require('lodash/isEqual');
import defaults = require('lodash/defaults');
import once = require('lodash/once');
import isFunction = require('lodash/isFunction');

import { createChangeEmitter } from 'change-emitter';
import storage from './modules/storage';
import api from './modules/request';
import { validateSendEventParams, validateInitParams } from './validations';

import {
  getEventsOnPage,
  getDeprecatedEvents,
  getEventData,
} from './helpers/eventsHelpers';

import { getFiltersOnPage } from './helpers/filtersHelpers';

import {
  Config,
  Client,
  User,
  EventName,
  PublicEventRequest,
  InternalEventRequest,
  IdsData,
  FiltersData,
} from './types';

import env = require('./env');

import elementDataset from 'element-dataset';

if (typeof document !== 'undefined') {
  elementDataset();
}

const emitter = createChangeEmitter();
const state: any = {};

const getUser = () => ({
  uid: storage.uid,
  sid: storage.sid,
  persist: storage.persist,
  exist: storage.exist,
});

const sendEventCreator = ({ events, key }) => (
  event: string,
  request: any = {},
  useCookie?: boolean,
  endpoint?: string
) => {
  if (useCookie) return storage.memoize(event, request);

  const properties =
    event === 'view-page'
      ? {
          ...request,
          url: window.location.href,
          ref: window.document.referrer,
          width: window.screen.width,
          height: window.screen.height,
        }
      : request;

  emitter.emit(event, properties);

  return api.request({ key, event, properties, user: getUser() }, endpoint);
};

const initializeCreator = (root, sendEvent, { platform, events }) => (
  context = root
) => {
  state.events = {
    ...getDeprecatedEvents(context),
    ...getEventsOnPage(context),
    ...storage.memorized,
  };

  state.filters = getFiltersOnPage(context);

  if (!state.events['view-page']) {
    sendEvent('view-page', {});
  }

  root.addEventListener('click', e => {
    if (!e.target.dataset || !e.target.dataset.findifyEvent) return;
    const { event, ...rest } = getEventData(e.target);
    sendEvent(event, rest, true);
  });

  return Object.keys(state.events).forEach((key: string) => {
    let endpoint;
    if (events[key] === false) return;

    if (key === 'update-cart') {
      if (isEqual(state.events[key], storage.cart)) {
        return;
      } else {
        storage.cart = state.events[key];
      }
    }

    if (key === 'purchase' && platform.bigcommerce)
      endpoint = env.bigcommerceTrackingUrl;
    return sendEvent(key, state.events[key], false, endpoint);
  });
};

module.exports = (props: Config | Function, context = document): Client => {
  if (isFunction(props)) return emitter.listen(props);

  const config = { events: {}, platform: {}, ...props };
  const sendEvent = sendEventCreator(config);
  const initialize = initializeCreator(context, sendEvent, config);
  return {
    sendEvent,
    initialize,
    listen: emitter.listen,
    get user(): User {
      return getUser();
    },
    get state(): any {
      return state;
    },
  };
};
