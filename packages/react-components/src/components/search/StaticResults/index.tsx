/**
 * @module components/search/StaticResults
 */

import Grid from 'components/common/Grid';
import Pagination from 'components/Pagination';
import { useItems } from '@findify/react-connect';
import MapArray from 'components/common/MapArray';
import ProductCard from 'components/Cards/Product';
import useTranslations from 'helpers/useTranslations';
import { Immutable } from '@findify/store-configuration';
import styles from 'components/search/StaticResults/styles.css';

export default ({ theme = styles }) => {
  const { items, config } = useItems<Immutable.SearchConfig>();
  const translate = useTranslations();
  return (
    <div className={theme.root}>
      <Grid
        role="main"
        aria-label={translate('search.title')}
        gutter={12}
        columns={config.getIn(['breakpoints', 'grid'], {
          400: 6,
          600: 4,
          1000: 3,
        })}
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
