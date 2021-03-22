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
});
export { hook, connect };
