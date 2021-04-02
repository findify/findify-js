/**
 * @module components/Breadcrumbs
 */

import MapArray from 'components/common/MapArray';
import createBreadcrumb from 'components/Breadcrumbs/createBreadcrumb';

import CheckboxContent from 'components/CheckboxFacet/content';
import RangeContent from 'components/RangeFacet/content';
import RatingContent from 'components/RatingFacet/content';
import ColorContent from 'components/ColorFacet/content';
import { ThemedSFCProps } from 'types';
import { useBreadcrumbs } from '@findify/react-connect';
import styles from 'components/Breadcrumbs/styles.css';
import { memo } from 'react';

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

export default memo(({ theme = styles }: ThemedSFCProps) => {
  const { config, filters } = useBreadcrumbs();
  return (
    <MapArray
      theme={theme}
      config={config}
      array={filters}
      factory={Breadcrumb}
    />
  );
});
