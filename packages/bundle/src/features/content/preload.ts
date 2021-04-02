import { getQuery } from '../../core/location';

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
  const { agent, node } = widget;
  const { q } = getQuery();
  const { type, sort } = node.dataset || {};

  agent
    .defaults({ type: [type], sort: parseSortHTMLAttribute(sort) })
    .set('q', q);
};
