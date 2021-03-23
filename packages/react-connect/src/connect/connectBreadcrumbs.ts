import createConnect from './createConnect';
import { Filter } from '../immutable/filters';
import { List } from 'immutable';

export const createFilters = (filters, updater) =>
  filters && filters.map((filter) => new Filter(filter, updater));

/**
 * Used to connect to query field of Search API response
 * and create usable search filters from it
 */
type Breadcrumbs = {
  /**
   * List of setup filters
   */
  filters: List<Filter>;

  /**
   * Remove all filters
   */
  onClearAll: (e: Event) => void;
};

const { hook, connect } = createConnect<Breadcrumbs>({
  field: 'meta:filters',
  mapProps: (filters, meta, update) => ({
    filters: (filters && createFilters(meta.get('filters'), update)) || List(),
  }),
  handlers: {
    onClearAll: ({ update }) => (e) => {
      if (e) e.preventDefault();
      update('filters');
    },
  },
});

export { hook, connect };
