import createConnect from './createConnect';
import { Filter, FilterValue } from '../immutable/filters';
import { Map } from 'immutable';

export const createFilters = (filters, updater) =>
  filters && filters.map(filter => new Filter(filter, updater));

/**
 * Used to connect to query field of Search API response
 * and create usable search filters from it
 */
export default createConnect({
  field: 'query',
  mapProps: (query, meta, update) => ({
    filters: meta && meta.has('filters')
      && createFilters(meta.get('filters'), update)
      || Map()
  }),
  handlers: {
    onClearAll: ({ update }) => (e) => {
      if (e) e.preventDefault();
      update('filters');
    },
  }
})
