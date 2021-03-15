import analytics, { Client } from '@findify/analytics';
import { getEventsOnPage, getDeprecatedEvents } from './bindings/events';
import { getFiltersOnPage } from './bindings/filters';
import { startDOMListeners } from './bindings/dom';

import elementDataset from 'element-dataset';
import { EventName } from '@findify/analytics/lib/types';

// Support data-* in IE9
elementDataset();

declare namespace document {
  const readyState: any;
  const body: any;
  const addEventListener: any;
}

let analyticsInstance: Client;

const initialize = (config = { events: {} }, onReady) => {
  const eventsConfig = (config && config.events) || {};

  analyticsInstance.state = {
    ...analyticsInstance.state,
    filters: getFiltersOnPage(document),
  };
  analyticsInstance.invalidate(getDeprecatedEvents(document));
  analyticsInstance.invalidate(getEventsOnPage(document));
  startDOMListeners(analyticsInstance.sendEvent, document);

  // Always send view-page event if it was not previously defined on the page
  if (
    eventsConfig[EventName.viewPage] !== false &&
    !analyticsInstance.state.events[EventName.viewPage]
  ) {
    analyticsInstance.sendEvent(EventName.viewPage, {});
  }
  if (!!onReady) onReady();
};

const analyticsDOM = (
  props,
  context: any = document,
  onReady: any = undefined
) => {
  if (typeof props === 'function') return analytics(props);
  if (analyticsInstance) return analyticsInstance;
  analyticsInstance = analytics(props);

  if (
    ['complete', 'loaded', 'interactive'].includes(document.readyState) &&
    document.body
  ) {
    initialize(props, onReady);
  } else {
    document.addEventListener(
      'DOMContentLoaded',
      () => initialize(props, onReady),
      false
    );
  }
  return analyticsInstance;
};

// analyticsDOM.prototype.__analytics = analytics;

export default analyticsDOM;
