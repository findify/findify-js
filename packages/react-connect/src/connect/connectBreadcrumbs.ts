import createConnect from './createConnect';
import { Filter, FilterValue } from '../immutable/filters';

const patchValues = (updater, filter) => (value) =>
  new FilterValue(value, updater, filter);

const patchFilter = (updater) => filter => 
  new Filter(filter, updater)
  .update('values', v => v.map(patchValues(updater, filter)));

export const createFilters = (filters, updater) => {
  if (!filters) return;
  return filters.map(patchFilter(updater));
}

export default createConnect({
  feature: 'Search',
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
