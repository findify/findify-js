import 'core-js/fn/array/includes';
import { analytics, Client } from '@findify/analytics';
import { getEventsOnPage, getDeprecatedEvents, getEventData } from './bindings/events';
import { getFiltersOnPage } from './bindings/filters';
import { startDOMListeners } from './bindings/dom';

// Support data-* in IE9
require('element-dataset')();

declare module global {
  const readyState: any;
  const body: any;
  const addEventListener: any;
}

let analyticsInstance: Client;

const initialize = () => {
  analyticsInstance.state = { ...analyticsInstance.state, filters: getFiltersOnPage(global) };
  analyticsInstance.invalidate(getDeprecatedEvents(global));
  analyticsInstance.invalidate(getEventsOnPage(global));
  startDOMListeners(analyticsInstance.sendEvent, global);
}

const analyticsDOM = (props, context: any = global) => {
  if (typeof props === 'function') return analytics(props);
  if (analyticsInstance) return analyticsInstance;
  analyticsInstance = analytics(props);

  if (['complete', 'loaded', 'interactive'].includes(global.readyState) && global.body) {
    initialize();
  } else {
    global.addEventListener('DOMContentLoaded', initialize, false);
  }

  return analyticsInstance;
}

module.exports = analyticsDOM;
