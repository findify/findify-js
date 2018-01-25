import { Facets } from '../types';

const isArray = require('lodash/isArray');
const isObject = require('lodash/isObject');

export const getFacetType = value => {
  if (isArray(value)) return Facets.category;
  if (isObject(value)) return Facets.range;
  return Facets.text;
};
