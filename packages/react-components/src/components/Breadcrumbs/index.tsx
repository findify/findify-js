/**
 * @module components/Breadcrumbs
 */

import MapArray from 'components/common/MapArray';
import createBreadcrumb from 'components/Breadcrumbs/createBreadcrumb';

import CheckboxContent from 'components/CheckboxFacet/content';
import RangeContent from 'components/RangeFacet/content';
import RatingContent from 'components/RatingFacet/content';
import ColorContent from 'components/ColorFacet/content';
import { IFacet, MJSConfiguration, ThemedSFCProps } from 'types';
import { List } from 'immutable';
import { useBreadcrumbs } from '@findify/react-connect';
import styles from 'components/Breadcrumbs/styles.css';

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

export default ({ theme = styles }: IBreadcrumbProps) => {
  const { filters, config } = useBreadcrumbs();
  return (
    <MapArray
      theme={theme}
      config={config}
      array={filters}
      factory={Breadcrumb}
    />
  );
};
