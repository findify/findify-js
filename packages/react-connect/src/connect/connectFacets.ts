import createConnect from './createConnect';
import { Facet, FacetValue } from '../immutable/facets';
import { Map } from 'immutable';

// 0.0014s overhead
export const patchFacets = (facets, updater) =>
  facets
  && facets.map(facet => new Facet(facet, updater))
  || Map();

/**
 * Used to connect to facets field of Search API response and transform it into
 * internal MJS structure
 */
const [hook, connect] = createConnect({
  field: 'facets',
  mapProps: (facets, _, update) => ({
    facets: patchFacets(facets, update)
  })
})

export { hook, connect };