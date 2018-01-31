import { createChangeEmitter } from 'change-emitter';
import storage from './modules/storage';
import { request as api } from './modules/request';
import { validateSendEventParams, validateInitParams } from './validations';
import { isFunction, shallowEqual } from './utils/helpers';
import settings from './settings';

import {
  Config,
  Client,
  User,
  EventName,
  PublicEventRequest,
  IdsData,
  FiltersData,
} from './types';

const emitter = createChangeEmitter();
const state: any = {};

const getUser = () => ({
  uid: storage.uid,
  sid: storage.sid,
  persist: storage.persist,
  exist: storage.exist,
});

const sendEventCreator = ({ events, key }: Config) => (
  event: string,
  request: any = {},
  useCookie?: boolean,
  endpoint?: string
) => {
  if (useCookie) return storage.memoize(event, request);

  const properties = event === EventName.viewPage
    ? {
        ...request,
        url: window.location.href,
        ref: window.document.referrer,
        width: window.screen.width,
        height: window.screen.height,
      }
    : request;

  emitter.emit(event, properties);
  
  return api({ key, event, properties, user: getUser() }, endpoint);
};

const initializeCreator = (root, sendEvent, { platform, events }: Config) => (
  context = root
) => {
  state.events = storage.memorized;

  if (!state.events[EventName.viewPage] && events[EventName.viewPage] !== false) {
    sendEvent(EventName.viewPage, {});
  }

  return Object.keys(state.events).forEach((key: string) => {
    let endpoint;
    if (events[key] === false) return;

    if (key === EventName.updateCart) {
      if (shallowEqual(state.events[key], storage.cart)) return;
      storage.cart = state.events[key];
    }

    if (key === EventName.purchase && platform.bigcommerce) {
      endpoint = settings.bigcommerceTrackingUrl;
    }

    return sendEvent(key, state.events[key], false, endpoint);
  });
};

module.exports = (props: Config | (() => void), context = global): Client => {
  if (isFunction(props)) {
    return emitter.listen(props);
  }
  const config = ({ events: {}, platform: {}, ...props } as Config);
  const sendEvent = sendEventCreator(config);
  const initialize = initializeCreator(context, sendEvent, config);
  return {
    sendEvent,
    initialize,
    listen: emitter.listen,
    get user(): User { return getUser(); },
    get state(): any { return state; },
  };
};
