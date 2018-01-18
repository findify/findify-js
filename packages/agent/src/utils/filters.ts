import { isArray, isObject } from 'lodash/fp';
import { FacetTypes } from '../constants';

export const getFacetType = value => {
  if (isArray(value)) return FacetTypes.category;
  if (isObject(value)) return FacetTypes.range;
  return FacetTypes.text;
};

export const normalizeFilters = filters =>
  Object.keys(filters).reduce((acc, key) => {}, {});
