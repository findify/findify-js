import { getQuery } from '../../core/location';
import { Map } from 'immutable';

const parseSortHTMLAttribute = (sort) => {
  try {
    if (!sort) {
      return [];
    }
    const parsedSort = JSON.parse(sort);
    return [parsedSort];
  } catch (err) {
    return [];
  }
};

export default (widget) => {
  const { agent, node, config } = widget;
  const { q } = getQuery();
  const { type, sort } = node.dataset || {};
  const _config = config.get(type);
  const defaultRequestParams =
    (_config && _config.get('defaultRequestParams', Map).toJS()) || {};

  agent
    .defaults({
      type: [type],
      sort: parseSortHTMLAttribute(sort),
      ...defaultRequestParams,
    })
    .set('q', q);
};
