/**
 * @module components/search/StaticResults
 */

import Grid from 'components/common/Grid';
import Pagination from 'components/Pagination';
import { ThemedSFCProps, MJSConfiguration } from 'types';
import { useItems } from '@findify/react-connect';
import MapArray from 'components/common/MapArray';
import ProductCard from 'components/Cards/Product';

/**
 * @deprecated
 */
import ItemsList from 'components/ItemsList';
import useTranslations from 'helpers/useTranslations';
import { Immutable } from '@findify/store-configuration';

/** Props that StaticResults accepts */
export interface IStaticResultsProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Number of columns that one item occupies in 12-col grid */
  columns: number;
}

const StaticResultsView = ({ theme }: IStaticResultsProps) => {
  const { items, config } = useItems<Immutable.SearchConfig>();
  const t = useTranslations();
  return (
    <div className={theme.root}>
      <Grid
        tabIndex={0}
        role="main"
        aria-label={t('Search results')}
        columns={config.getIn(['breakpoints', 'grid'], {
          400: 6,
          600: 4,
          1000: 3,
        })}
        gutter={12}
      >
        {MapArray({
          array: items,
          factory: ProductCard,
          config: config.get('product'),
        })}
      </Grid>
      <Pagination />
    </div>
  );
};

export default StaticResultsView;
