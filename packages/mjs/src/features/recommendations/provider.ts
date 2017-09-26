import { createRecommendation } from '@findify/helpers';
import { defer, get } from 'lodash';

import { RESPONSE_SUCCESS } from '../../helpers/constants';

/**
 * @param type Recommendation type
 * @param slot Recommendation slot
 * @param product id || ids from integration tags 
 * @param multipleIds should we show multiple ids or single if we on product page
 */
const getPayload = (type, slot, { item_id, item_ids }, multipleIds) => {
  if (['bought', 'viewed'].includes(type)) {
    return { slot, item_id };
  }
  if (type === 'purchasedTogether') {
    if (!multipleIds) return { slot, item_ids: [item_id] };
    return { slot, item_ids };
  }
  return { slot };
};

const getIdsFromEvents = events => ({
  item_id: get(events, ['page-view', 'item_id']),
  item_ids: get(events, ['purchase', 'line_items'], []).map(
    i => i.item_id || i.product_id,
  ),
});

export default ({
  analytics,
  response,
  config: { slot, api, type, multipleIds },
}) => {
  const { filters, events } = analytics.state;
  const ids = getIdsFromEvents(events);
  console.log(ids);

  const instance: any = createRecommendation('predefined', api);
  const subscriber = callback => ({ name }) =>
    name === RESPONSE_SUCCESS && callback(instance.get('response'));

  if (!response)
    defer(() =>
      instance.emit({
        name: 'request',
        payload: {
          ...getPayload(type, slot, ids, multipleIds),
          filters,
        },
      }),
    );

  return {
    subscribe: callback => instance.subscribe(subscriber(callback)),
  };
};
