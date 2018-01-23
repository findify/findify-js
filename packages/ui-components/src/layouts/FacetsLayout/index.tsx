import * as React from 'react';
import { FacetsList } from 'lists/FacetsList';
import withHooks from 'helpers/withHooks';
import { mapTypeToFacet } from 'helpers/mapTypeToFacet';

export const FacetsLayout: any = withHooks(
  'facets'
)(({ onFacetsChange, onMobileFacetsClose, response, className, ...rest }) =>
  React.createElement(FacetsList, {
    ...rest,
    className,
    facets: response.facets,
    onClose: onMobileFacetsClose,
    onChange: onFacetsChange,
  })
);
