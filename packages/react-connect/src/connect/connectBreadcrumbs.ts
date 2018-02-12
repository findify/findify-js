import createConnect from './createConnect';
import { Filter, FilterValue } from '../immutable/filters';

export const createFilters = (filters, updater) => 
  filters && filters.map(filter => new Filter(filter, updater));

export default createConnect({
  field: 'query',
  mapProps: (query, meta, update) => ({
    filters: meta && meta.has('filters') &&
      createFilters(meta.get('filters'), update)
  }),
  handlers: {
    onClearAll: ({ update }) => (e) => {
      if (e) e.preventDefault();
      update('filters');
    },
  }
})
