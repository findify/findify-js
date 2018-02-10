import createConnect from './createConnect';
import { Facet, FacetValue } from '../immutable/facets';
import * as microtime from 'microtime';

// => without patching: 0.0001s
export const patchFacets = (facets, updater) => 
  facets && facets.map(facet => new Facet(facet, updater));

export default createConnect({
  feature: 'Search',
  field: 'facets',
  mapProps: (facets, _, update) => ({
    facets: patchFacets(facets, update)
  })
})
