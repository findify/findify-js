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

export default ({ theme = styles, itemConfig }) => {
  const { items, config } = useItems<Immutable.SearchConfig>();
  const { items: promos } = usePromos();

  const promosIndexes = promos.map(promo => promo.get('position')).toJS().sort()
  const productsIndexes = items.map((_, idx) => idx + 1).toJS().filter(i => !promosIndexes.includes(i))
  const lastProductIndex = productsIndexes.at(-1)
  promosIndexes.forEach((_, idx) => productsIndexes.push(lastProductIndex + idx + 1))

  const translate = useTranslations();
  return (
    <div className={theme.root}>
      <Grid
        role="list"
        wrapperComponent="ul"
        columnComponent="li"
        aria-label={translate('search.title')}
        gutter={12}
        columns={config.getIn(['breakpoints', 'grid'])}
      >
        {MapArray({
          array: promos,
          factory: PromoCard,
          config: config.get('promo'),
          order: (item) => item.get('position'),
        })}
        {MapArray({
          array: items,
          factory: ProductCard,
          config: itemConfig || config.get('product'),
          order: (_, index) => productsIndexes[index],
          isSearch: true
        })}
      </Grid>
      <Pagination />
    </div>
  );
};
