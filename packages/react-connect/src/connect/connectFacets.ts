import createConnect from './createConnect';
import { Facet, FacetValue } from '../immutable/facets';
import * as microtime from 'microtime';

// => with patch: 0.004s
const patchValues = (update, facet) => (value) => 
  new FacetValue(value, update, facet);

// => with patch: 0.002s
const patchFacet = (update) => facet =>
  new Facet(facet, update)
  .update('values', v => v.map(patchValues(update, facet)));

// => without patching: 0.0001s
export const patchFacets = (facets, updater) =>
  facets && facets.map(patchFacet(updater));

export default createConnect({
  feature: 'Search',
  field: 'facets',
  mapProps: (facets, _, update) => ({
    facets: patchFacets(facets, update)
  })
})
