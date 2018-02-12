import createConnect from './createConnect';
import { Facet, FacetValue } from '../immutable/facets';

// 0.0014s overhead
export const patchFacets = (facets, updater) => 
  facets && facets.map(facet => new Facet(facet, updater));

export default createConnect({
  field: 'facets',
  mapProps: (facets, _, update) => ({
    facets: patchFacets(facets, update)
  })
})
