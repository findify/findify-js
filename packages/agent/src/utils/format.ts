import 'core-js/fn/array/includes';
import 'core-js/fn/object/values';

import * as Types from '../types';
import { getFacetType } from './filters';
import { identity } from './helpers';
import { Map } from 'immutable';

const _initial = Map();

const formatFilters = (filters) => 
  filters
  .filter(value => !!value && !value.isEmpty())
  .map((values, name) => Map({
    name,
    type: getFacetType(values.first()),
    values: values.map(value => ({ value })),
  }))
  .toList();

const formatQueryField = key =>
  ({
    filters: formatFilters,
  }[key] || identity);

export const queryToState = (prev, next, defaults) => {
  const fields = prev.filter((_, key) => next.has(key));
  
  return fields.reduce((acc, value, key) => {

    if (defaults.get(key) === value) return acc;
    if (key !== 'filters') return acc.set(key, value);
    return acc.set(key,
      value.reduce((filters, filter) => {
        const values = filter.get('values')
          .filter(v => !defaults.hasIn([key, filter.name, v.get('value')]))
          .map(v => v.get('value'));
        return !values.empty() ? filters : filters.set(filter.get('name'), values);
      }, _initial)
    )
  }, _initial);
};

export const stateToQuery = (state: Map<any, any>): Map<any, any> =>
  state.map((value, key) => {
    return formatQueryField(key)(value)
  });
