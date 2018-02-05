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

export const queryToState = (prev, next, defaults?) => {
  const fields = prev.filter((_, key) => next.has(key));
  
  /**
   * Walk trough old keys to prevent new fields tracking
   */
  return fields.keySeq().reduce((acc, key) => {
    const nextField = next.get(key);

    /**
     * Skip if value equals default one
     */
    if (defaults && defaults.get(key) === nextField) return acc;

    /**
     * Return new value without formating
     */
    if (key !== 'filters') return acc.set(key, nextField);

    /**
     *  Reduce filters
     *  from: [{ name: string, type: string, values:[{ value: any }]}]
     *  to: { [name: string]: [any[] }
     */
    return acc.set(key,
      nextField.reduce((filters, nextFilter) => {
        const nextFilterName = nextFilter.get('name');
        const values = nextFilter
          .get('values')
          .filter(v => !defaults || !defaults.hasIn([key, nextFilterName, v.get('value')]))
          .map(v => v.get('value'));
        return values.isEmpty() ? filters : filters.set(nextFilterName, values);
      }, _initial)
    )
  }, _initial);
};

export const stateToQuery = (state: Map<any, any>): Map<any, any> =>
  state.map((value, key) => {
    return formatQueryField(key)(value)
  });
