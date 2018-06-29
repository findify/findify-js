/**
 * @module components/Breadcrumbs
 */

import React from 'react';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import createBreadcrumb from 'components/Breadcrumbs/createBreadcrumb';

import CheckboxContent from 'components/CheckboxFacet/content';
import RangeContent from 'components/RangeFacet/content';
import RatingContent from 'components/RatingFacet/content';
import ColorContent from 'components/ColorFacet/content';
import { ThemedSFC, IFacet, MJSConfiguration, ThemedSFCProps } from 'types';
import { List } from 'immutable'


/**
 * Breadcrumb factory used to automatically initialize breadcrumbs
 * depending on filters used in a search
 */
const Breadcrumb = createBreadcrumb({
  text: CheckboxContent,
  range: RangeContent,
  color: ColorContent,
  category: CheckboxContent,
  price: RangeContent,
  rating: RatingContent,
});

/** Props that Breadcrumbs component accepts */
export interface IBreadcrumbProps extends ThemedSFCProps {
  /* List of active filters for current query */
  filters: List<IFacet>;
  /* MJS configuration */
  config: MJSConfiguration;
}

const BreadcrumbsView: React.SFC<IBreadcrumbProps> = ({ filters, theme, config }: IBreadcrumbProps) => (
  <MapArray
    theme={theme}
    config={config}
    array={filters}
    factory={Breadcrumb}
    />
)

export default BreadcrumbsView;
