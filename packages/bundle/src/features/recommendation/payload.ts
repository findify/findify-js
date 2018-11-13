const path = (obj, paths, defaultValue?) => {
  let val = obj;
  let idx = 0;
  while (idx < paths.length) {
    if (val == null) return;
    val = val[paths[idx]];
    idx += 1;
  }
  return val || defaultValue;
}

const getIdsFromEvents = events => ({
  item_id: path(events, ['view-page', 'item_id']),
  item_ids: path(events, ['update-cart', 'line_items'], []).map(
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

  if (['bought', 'viewed'].includes(type)) {
    payload.item_ids = [item_id];
  }

  if (type === 'purchasedTogether') {
    payload.item_ids = multipleIds ? item_ids : [item_id];
  }

  return payload;
};
