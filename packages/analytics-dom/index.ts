
import elementDataset from 'element-dataset';

if (typeof document !== 'undefined') {
  elementDataset();
}


root.addEventListener('click', e => {
  if (!e.target.dataset || !e.target.dataset.findifyEvent) return;
  const { event, ...rest } = getEventData(e.target);
  sendEvent(event, rest, true);
});

...getDeprecatedEvents(context),
...getEventsOnPage(context),

import {
  getEventsOnPage,
  getDeprecatedEvents,
  getEventData,
} from './utils/eventsHelpers';

import { getFiltersOnPage } from './utils/filtersHelpers';
