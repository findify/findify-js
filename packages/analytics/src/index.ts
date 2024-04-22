import { createChangeEmitter } from '@findify/change-emitter';
import { request as api } from './modules/request';
import storage from './modules/storage';
import settings from './settings';
import { isFunction, shallowEqual } from './utils/helpers';
import { isCollection, isSearch } from './utils/location';
import { onLeavePage } from './utils/onLeavePage';

export * from './types';

import { Client, Config, EventName, User } from './types';

const emitter = createChangeEmitter();

let state: any = {
  events: {},
  filters: {},
};

const getUser = () => ({
  uid: storage.uid,
  sid: storage.sid,
  persist: storage.persist,
  exist: storage.exist,
});

const getPageType = (request) => {
  if (request.item_id || request.variant_item_id) {
    return 'product-details';
  } else if (isSearch(request.url)) {
    return 'search-results';
  } else if (isCollection(request.url)) {
    return 'smart-collection';
  } else {
    return null;
  }
};

/**
 * Get events properties.
 */
const getEventProperties = (event, request) => {
  switch (event) {
    case EventName.viewPage:
      return {
        ...request,
        url: request.url ?? window.location.href,
        ref: request.ref ?? window.document.referrer,
        width: request.width ?? window.screen.width,
        height: request.height ?? window.screen.height,
        ...(getPageType(request) || request.page_type
          ? { page_type: request.page_type ?? getPageType(request) }
          : {}),
      };
    default:
      return request;
  }
};

/**
 * Create events creator.
 * The sendEvent function returns Promise and allow to store events in memory
 * @param config
 */
const sendEventCreator = ({ events, key, user }: Config) => (
  event: string,
  _request: any = {},
  useCookie?: boolean,
  endpoint?: string
) => {
  const { force, ...request } = _request;
  if (
    !force &&
    events &&
    typeof events[event] !== 'undefined' &&
    events[event] === false
  )
    return;

  if (useCookie) return storage.memoize(event, request);

  const properties = getEventProperties(event, request);

  emitter.emit(event, properties);

  const currentUser = user ? user : getUser();

  return api({ key, event, properties, user: currentUser }, endpoint);
};

/**
 * Send memorized events
 * @param sendEvent
 * @param config
 */
const createInvalidator = (sendEvent, { platform, events }: Config) => (
  eventsToFire
) => {
  if (!Object.keys(eventsToFire).length) return;

  state.events = {
    ...state.events,
    ...eventsToFire,
  };

  return Object.keys(eventsToFire).forEach((key: string) => {
    let endpoint;
    if (events && events[key] === false) return;

    if (key === EventName.updateCart) {
      if (shallowEqual(eventsToFire[key], storage.cart)) return;
      storage.cart = state.events[key];
    }

    if (key === EventName.purchase && platform === 'bigcommerce') {
      endpoint = settings.bigcommerceTrackingUrl;
    }

    return sendEvent(key, eventsToFire[key], false, endpoint);
  });
};

/**
 * Initialize analytics or subscribe to events
 * @param props Configuration or Listener
 */

export default (props: Config | (() => void)): Client => {
  if (isFunction(props)) return emitter.listen(props);

  const config = { events: {}, platform: {}, ...props } as Config;
  const sendEvent = sendEventCreator(config);
  const invalidate = createInvalidator(sendEvent, config);
  invalidate(storage.memorized);
  return {
    sendEvent,
    invalidate,
    listen: emitter.listen,
    onLeavePage,
    get user(): User {
      return getUser();
    },
    get state(): any {
      return state;
    },
    set state(s) {
      state = s;
    },
  };
};
