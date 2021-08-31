/**
 * @module components/search/StaticResults
 */

import Grid from 'components/common/Grid';
import Pagination from 'components/Pagination';
import { useItems, usePromos } from '@findify/react-connect';
import MapArray from 'components/common/MapArray';
import ProductCard from 'components/Cards/Product';
import PromoCard from 'components/Cards/Promo';
import useTranslations from 'helpers/useTranslations';
import { Immutable } from '@findify/store-configuration';
import styles from 'components/search/StaticResults/styles.css';

export default ({ theme = styles }) => {
  const { items, config } = useItems<Immutable.SearchConfig>();
  const { items: promos } = usePromos();

  const translate = useTranslations();
  return (
    <div className={theme.root}>
      <Grid
        role="main"
        wrapperComponent="ul"
        columnComponent="li"
        aria-label={translate('search.title')}
        gutter={12}
        columns={config.getIn(['breakpoints', 'grid'])}
      >
        {MapArray({
          array: items,
          factory: ProductCard,
          config: config.get('product'),
        })}
        {MapArray({
          array: promos,
          factory: PromoCard,
          config: config.get('promo'),
          order: (item) => item.get('position'),
        })}
      </Grid>
      <Pagination />
    </div>
  );
};
