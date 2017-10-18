import { pick, memoize, isArray } from 'lodash';

export const createMetaNormalizer = ({ limit, offset, ...meta }) => state => ({
  limit: (limit && Number(limit)) || 24,
  offset: (offset && Number(offset)) || 0,
  ...meta,
  ...state,
});

export const pickRequestFromMeta = memoize(props =>
  pick(props, ['filters', 'limit', 'offset'])
);

export const createFacetsUpdater = instance => ({
  type,
  changes,
  ...rest,
}: any) => {
  const updateCategoryFacet = payload =>
    instance.emit({
      name: payload.selected ? 'setNestedListFacet' : 'unsetNestedListFacet',
      payload,
    });

  switch (type) {
    case 'text':
      return instance.emit({
        name: changes.selected ? 'setTextFacet' : 'unsetTextFacet',
        payload: changes,
      });
    case 'range':
      return instance.emit({
        name: changes.selected ? 'setRangeFacet' : 'unsetRangeFacet',
        payload: pick(changes, ['name', 'from', 'to']),
      });
    case 'category':
      if (isArray(changes)) return changes.forEach(updateCategoryFacet);
      return updateCategoryFacet(changes);
    default:
      return;
  }
};
