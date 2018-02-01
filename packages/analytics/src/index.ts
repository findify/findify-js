import { createChangeEmitter } from 'change-emitter';
import storage from './modules/storage';
import { request as api } from './modules/request';
import { validateSendEventParams, validateInitParams } from './validations';
import { isFunction, shallowEqual } from './utils/helpers';
import settings from './settings';

export * from './types';

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
let state: any = {};

const getUser = () => ({
  uid: storage.uid,
  sid: storage.sid,
  persist: storage.persist,
  exist: storage.exist,
});

/**
 * Create events creator.
 * The sendEvent function returns Promise and allow to store events in memory
 * @param config
 */
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

/**
 * Send memorized events
 * @param sendEvent 
 * @param config
 */
const invalidate = (sendEvent, eventsToFire, { platform, events }: Config) => {
  state.events = {
    ...state.events,
    ...eventsToFire
  };

  if (!eventsToFire[EventName.viewPage] && events[EventName.viewPage] !== false) {
    sendEvent(EventName.viewPage, {});
  }

  return Object.keys(eventsToFire).forEach((key: string) => {
    let endpoint;
    if (events[key] === false) return;

    if (key === EventName.updateCart) {
      if (shallowEqual(eventsToFire[key], storage.cart)) return;
      storage.cart = state.events[key];
    }

    if (key === EventName.purchase && platform.bigcommerce) {
      endpoint = settings.bigcommerceTrackingUrl;
    }

    return sendEvent(key, eventsToFire[key], false, endpoint);
  });
};

/**
 * Initialize analytics or subscribe to events
 * @param props Configuration or Listener
 */
export const analytics = (props: Config | (() => void)): Client => {
  if (isFunction(props)) return emitter.listen(props);

  const config = ({ events: {}, platform: {}, ...props } as Config);
  const sendEvent = sendEventCreator(config);
  
  invalidate(sendEvent, storage.memorized, config);

  return {
    sendEvent,
    invalidate,
    listen: emitter.listen,
    get user(): User { return getUser(); },
    get state(): any { return state; },
    set state(s) { state = s; }
  };
};


module.exports = analytics;
