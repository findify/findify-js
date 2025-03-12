import * as Types from '../types';
import { getFacetType } from './filters';
import { identity } from './helpers';
import { Map, fromJS } from 'immutable';

const _initial = Map();

/**
 * Used to serialize filters into request format for Search API
 * @param filters array of filters
 */
const formatFilters = (filters) =>
  filters
  .filter(value => !!value && !value.isEmpty())
  .map((values, name) => {
    const type = getFacetType(values.first());
    return Map({
      name,
      type,
      values:
        (type === 'range' && values) ||
        (type === 'category' && values.map(value => ({ value: value.join('>') }))) ||
        values.map(value => ({ value })),
    })
  })
  .toList();
/**
 * Used to create serializer for each request field
 * @param key
 * @returns function, which takes field value and returns its serialized value
 */
const formatQueryField = key =>
  ({
    filters: formatFilters,
  }[key] || identity);

/**
 * Used to build new state out of response meta, previous state and possible default values
 * This procedure is complex mainly because of filters, that may vary with each request quite heavily,
 * ranging from a new filter value added, to addition and removal of new filters
 * @param prev previous Agent state
 * @param next response metadata
 * @param defaults default values for agent
 */

const initialFields = fromJS({ filters: {} });

export const queryToState = (prev, next, defaults?) => {
  const fields = initialFields.merge(prev.filter((_, key) => next.has(key)));

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
        const type = nextFilter.get('type');

        const values = nextFilter
          .get('values')
          .filter(v => !defaults ||
            (
              (type === 'range' && !defaults.hasIn([key, nextFilterName])) ||
              !defaults.hasIn([key, nextFilterName,  v.get('value')])
            )
          )
          .map(v =>
            (type === 'range' && v) ||
            (type === 'category' && v.get('value').split('>')) ||
            v.get('value')
        ); // ["value"]
        const prevFilters = filters?.get(nextFilterName, _initial); //filters = {brand: ['nike', 'adidas']}
        return values.isEmpty()
          ? filters
          : prevFilters
          ? filters.set(nextFilterName, [...prevFilters, ...values])
          : filters.set(nextFilterName, values);
      }, _initial)
    )
  }, _initial);
};

/**
 * Used to serialize agent state back to query
 * @param state Agent state
 */
export const stateToQuery = (state: Map<any, any>): Map<any, any> =>
  state.map((value, key) => formatQueryField(key)(value));
