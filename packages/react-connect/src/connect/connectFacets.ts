import createConnect from './createConnect';
import { Facet, FacetValue } from '../immutable/facets';
import { List, Map } from 'immutable';

// 0.0014s overhead
export const patchFacets = (facets, updater) =>
  (facets && facets.map((facet) => new Facet(facet, updater))) || Map();

type Facets = {
  /**
   * List of facets
   */
  facets: List<Facet>;

  /**
   * Reset all facets
   */
  onReset: (e: Event) => void;
};

/**
 * Used to connect to facets field of Search API response and transform it into
 * internal MJS structure
 */
const { hook, connect } = createConnect<Facets>({
  field: 'facets',
  mapProps: (facets, _, update) => ({
    facets: patchFacets(facets, update),
  }),
  handlers: {
    onReset: ({ update }) => (e) => {
      if (e) e.preventDefault();
      update('filters', (f) => f && f.clear());
    },
  },
});
export { hook, connect };
