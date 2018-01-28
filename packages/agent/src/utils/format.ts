import 'core-js/fn/array/includes';

import * as Types from '../types';
import { getFacetType } from './filters';
const identity = require('lodash/identity');
const pick = require('lodash/fp/pick');
const values = require('lodash/fp/values');
const get = require('lodash/fp/get');

const pickFields = pick(values(Types.Field));
const pickFilterValue = get('value');

const formatFilters = filters =>
  Object.keys(filters)
    .filter(name => filters[name] && !!filters[name].length)
    .map(name => ({
      name,
      type: getFacetType(filters[name][0]),
      values: filters[name].map(value => ({ value })),
    }));

const formatQueryField = key =>
  ({
    filters: formatFilters,
  }[key] || identity);

export const queryToState = (prev, next, defaults = {}) => {
  const fields = Object.keys(prev).filter(key => next.hasOwnProperty(key));
  
  return fields.reduce((acc, key) => {
    if (defaults[key] === next[key]) return acc;
    if (key !== 'filters') return { ...acc, [key]: next[key] };
    return {
      ...acc,
      [key]: next[key].reduce((filters, filter) => {
        const _default = get([key, filter.name])(defaults);
        const values = filter.values
          .filter(v => !_default || !_default.includes(v.value))
          .map(pickFilterValue);
        return !values.length
          ? acc
          : {
              ...filters,
              [filter.name]: values,
            };
      }, {}),
    };
  }, {});
};

export const stateToQuery = (state: Types.State): any =>
  Object.keys(state).reduce(
    (acc, key) => ({ ...acc, [key]: formatQueryField(key)(state[key]) }),
    {}
  );
