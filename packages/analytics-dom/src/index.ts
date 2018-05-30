import 'core-js/fn/array/includes';
import analytics, { Client } from '@findify/analytics';
import { getEventsOnPage, getDeprecatedEvents, getEventData } from './bindings/events';
import { getFiltersOnPage } from './bindings/filters';
import { startDOMListeners } from './bindings/dom';

import elementDataset from 'element-dataset';
import { EventName } from '@findify/analytics/lib/types';
// Support data-* in IE9

elementDataset();


declare module document {
  const readyState: any;
  const body: any;
  const addEventListener: any;
}

let analyticsInstance: Client;

const initialize = (config = {events: {}}) => {
  const eventsConfig = config && config.events || {};

  analyticsInstance.state = { ...analyticsInstance.state, filters: getFiltersOnPage(document) };
  analyticsInstance.invalidate(getDeprecatedEvents(document));
  analyticsInstance.invalidate(getEventsOnPage(document));
  startDOMListeners(analyticsInstance.sendEvent, document);

  // Always send view-page event if it was not previously defined on the page
  if (
    eventsConfig[EventName.viewPage] !== false &&
    !analyticsInstance.state[EventName.viewPage]
  ) {
    analyticsInstance.sendEvent(EventName.viewPage, {});
  }
}

const analyticsDOM = (props, context: any = document) => {
  if (typeof props === 'function') return analytics(props);
  if (analyticsInstance) return analyticsInstance;
  analyticsInstance = analytics(props);

  if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
    initialize(props);
  } else {
    document.addEventListener('DOMContentLoaded', () => initialize(props), false);
  }

  return analyticsInstance;
}

analyticsDOM.prototype.__analytics = analytics;

export default analyticsDOM;
