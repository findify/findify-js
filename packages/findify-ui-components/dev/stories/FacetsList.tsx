import * as React from 'react';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@kadira/storybook-addon-knobs';
import { host } from 'storybook-host';
const { storiesOf, action } = require('@kadira/storybook');

import { FacetsList } from '../../src/lists/FacetsList';
import { mapTypeToFacet } from '../../src/helpers/mapTypeToFacet';

const facets = require('../data/raw.json').facets;
import { withFacets } from '../helpers/withFacets';
import cfg from '../data/config';

const Component = withFacets(FacetsList);

storiesOf('Facets List', module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: 'Default render of facets',
      align: 'left top',
      width: 400,
    }),
  )
  .addWithInfo('Desktop', () => {
    return (
      <Component
        config={cfg.facets}
        facets={facets}
        onChange={action('Change facet')}
      >
        {facets.map(facet =>
          mapTypeToFacet(cfg.facets[facet.name] || facet.type)({
            ...facet,
            isMobile: false,
            key: facet.name,
          }),
        )}
      </Component>
    );
  })
  .addWithInfo('Mobile', () => {
    return (
      <Component
        isMobile
        config={cfg.facets}
        facets={facets}
        onChange={action('Change facet')}
      >
        {facets.map(facet =>
          mapTypeToFacet(cfg.facets[facet.name] || facet.type)({
            ...facet,
            isMobile: true,
            key: facet.name,
          }),
        )}
      </Component>
    );
  });
