import get from 'lodash/get';

const getIdsFromEvents = events => ({
  item_id: get(events, ['view-page', 'item_id']),
  item_ids: get(events, ['update-cart', 'line_items'], []).map(
    i => i.item_id || i.product_id
  ),
});

export const getPayload = (config, { events, filters }) => {
  const { item_id, item_ids } = getIdsFromEvents(events)
  const type = config.get('type');
  const slot = config.get('slot');
  const multipleIds = config.get('multipleIds');

  const payload: any = { slot, type };

  if (filters && !!filters.length) {
    payload.rules = filters;
  }

  if (config.get('rules')) {
    payload.rules = config.get('rules').toJS()
  }

  if (['bought', 'viewed'].includes(type)) {
    payload.item_ids = [item_id];
  }

  if (type === 'purchasedTogether') {
    payload.item_ids = multipleIds ? item_ids : [item_id];
  }

  if (config.get('item_ids')) {
    payload.item_ids = config.get('item_ids').toJS()
  }

  return payload;
};
