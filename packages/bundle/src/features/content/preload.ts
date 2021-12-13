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
  const { sort } = node.dataset || {};
  const defaultRequestParams =
    (config && config.get('defaultRequestParams', Map).toJS()) || {};

  agent
    .defaults({
      type: [config.get('source')],
      sort: parseSortHTMLAttribute(sort),
      ...defaultRequestParams,
    })
    .set('q', q);
};
