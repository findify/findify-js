import { Facets } from '../types';

import { isArray, isObject } from './helpers';

export const getFacetType = value => {
  if (isArray(value)) return Facets.category;
  if (isObject(value)) return Facets.range;
  return Facets.text;
};
