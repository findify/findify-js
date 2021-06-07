import { Immutable } from '@findify/store-configuration';
import { Widget } from '../../core/widgets';
import { Map } from 'immutable';

const getIdsFromEvents = (events) => ({
  item_id: events?.['view-page']?.['item_id'],
  item_ids: (events?.['update-cart']?.['line_items'] || []).map(
    (i) => i.item_id || i.product_id
  ),
});

const getRulesFromNode = (node) => {
  try {
    const rules = node.getAttribute('data-findify-rules');
    return JSON.parse(rules);
  } catch (err) {
    return null;
  }
};

export const getPayload = (
  widget: Widget<Immutable.RecommendationConfig>,
  { events, filters }
) => {
  const { config, node } = widget;
  const { item_id, item_ids } = getIdsFromEvents(events);
  const type: any = config.get('type');
  const slot = config.get('slot');
  const multipleIds = config.get('multipleIds');

  const payload: any = {
    ...config.get('defaultRequestParams', Map()).toJS(),
    slot,
    type,
  };

  const rulesToApply = getRulesFromNode(node) || filters;

  if (rulesToApply && !!rulesToApply.length) {
    payload.rules = rulesToApply;
  }

  if (['bought', 'viewed'].includes(type)) {
    payload.item_ids = [item_id];
  }

  if (type === 'purchasedTogether') {
    payload.item_ids = multipleIds ? item_ids : [item_id];
  }

  return payload;
};
