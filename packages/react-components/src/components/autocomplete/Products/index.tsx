/**
 * @module components/autocomplete/Products
 */
import styles from 'components/autocomplete/Products/styles.css';
import ProductCard from 'components/Cards/Product';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';

export default ({
  theme = styles,
  config,
  isTrendingSearches,
  registerItems,
  highlightedItem,
}) => {
  const { items, meta } = useItems<Immutable.AutocompleteConfig>();
  const translate = useTranslations();

  registerItems(items, config.get('limit'));

  return (
    <div className={theme.root} display-if={items.size}>
      <h4 className={theme.title}>
        {isTrendingSearches
          ? translate('autocomplete.trendingProducts')
          : translate('autocomplete.productMatches')}
      </h4>
      <Grid
        columns={config.getIn(['breakpoints', 'products'], '12')}
        gutter={12}
      >
        {MapArray({
          array: items,
          limit: config.get('limit'),
          factory: ProductCard,
          config: config.get('item'),
          mapProps: (item) => ({
            highlighted:
              highlightedItem && item.hashCode() === highlightedItem.hashCode(),
          }),
        })}
      </Grid>
    </div>
  );
};
