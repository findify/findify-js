import { defer } from 'lodash';
import * as React from 'react';
import {
  compose,
  setDisplayName,
  withState,
  withPropsOnChange,
} from 'recompose';
import { mapTypeToFacet } from 'helpers/mapTypeToFacet';

const Facet = compose(
  withState('isLoaded', 'setLoaded', ({ isMobile }) => isMobile),
  withPropsOnChange(['type'], ({ config, facet }) => {
    const type =
      (config.facets.types && config.facets.types[facet.name]) || facet.type;
    return {
      type: facet.type,
      config: { ...config.facets[type], currency: config.currency },
      factory: mapTypeToFacet(type),
    };
  })
)(
  ({ factory, facet, isLoaded, setLoaded, ...rest }: any) =>
    isLoaded
      ? factory({ ...rest, ...facet, isMobile: false })
      : defer(() => setLoaded(true)) && null
);

export const DesktopFacetsList = setDisplayName(
  'DesktopFacetsList'
)(({ facets, className, ...rest }: DesktopFacetsListType) => (
  <div className={className}>
    {facets.map(facet =>
      React.createElement(Facet, {
        ...rest,
        facet,
        key: facet.name,
        label: rest.config.facets.labels[facet.name],
      })
    )}
  </div>
));

type DesktopFacetsListType = {
  children: any[];
  onChange: void;
  config: any;
  className?: string;
  facets?: any;
};
