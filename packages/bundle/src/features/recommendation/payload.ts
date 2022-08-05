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

  let itemIDs;

  if (multipleIds) {
    itemIDs = item_ids
  } else if (item_id) {
    itemIDs = [item_id]
  }

  payload.item_ids = itemIDs;

  return payload;
};
