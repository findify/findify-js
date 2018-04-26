import React from 'react';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import createBreadcrumb from 'components/Breadcrumbs/createBreadcrumb';

import CheckboxContent from 'components/CheckboxFacet/content';
import RangeContent from 'components/RangeFacet/content';
import RatingContent from 'components/RatingFacet/content';
import ColorContent from 'components/ColorFacet/content';

const Breadcrumb = createBreadcrumb({
  text: CheckboxContent,
  range: RangeContent,
  color: ColorContent,
  category: CheckboxContent,
  price: RangeContent,
  rating: RatingContent,
});

export default ({ filters, theme, config }) => (
  <MapArray
    theme={theme}
    config={config}
    array={filters}
    factory={Breadcrumb}
    />
)
