import { isArray, isObject } from 'lodash/fp';
import { Facets } from '../types';

export const getFacetType = value => {
  if (isArray(value)) return Facets.category;
  if (isObject(value)) return Facets.range;
  return Facets.text;
};
