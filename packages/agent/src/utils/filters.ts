import { Facets } from '../types';
import { isImmutable, Map, List } from 'immutable';
import { isArray, isObject } from './helpers';

export const getFacetType = value => {
  if (isImmutable(value)) {
    if (Map.isMap(value)) return Facets.range;
    if (List.isList(value)) return Facets.category;
  }
  if (isArray(value)) return Facets.category;
  if (isObject(value)) return Facets.range;
  return Facets.text;
};
