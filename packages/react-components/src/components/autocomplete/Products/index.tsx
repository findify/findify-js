/**
 * @module components/autocomplete/Products
 */
import { useCallback } from 'react';
import styles from 'components/autocomplete/Products/styles.css';
import ProductCard from 'components/Cards/Product';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import { useItems, useQuery } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';
import Title from 'components/autocomplete/BlockTitle';
import { emit } from 'helpers/emmiter';

const makeSearchUrl = (query, config) => {
  const prefix = config.getIn(['location', 'prefix']);
  const searchUrl = config.getIn(['location', 'searchUrl']);
  return `${searchUrl}?${prefix ? prefix + '_' : ''}q=${query}`;
};

export default ({
  theme = styles,
  config,
  isTrendingSearches,
  registerItems,
  highlightedItem,
}) => {
  const {
    items,
    config: baseConfig,
  } = useItems<Immutable.AutocompleteConfig>();
  const { query } = useQuery();
  const translate = useTranslations();

  const onViewAll = useCallback(
    (e) => {
      e.preventDefault();
      emit(
        'search',
        baseConfig.get('widgetKey'),
        query.get('q') ? query.get('q') : ''
      );
    },
    [query]
  );

  registerItems(items, config.get('limit'));

  return (
    <div className={theme.root} display-if={items.size}>
      <Title>
        {isTrendingSearches
          ? translate('autocomplete.trendingProducts')
          : translate('autocomplete.productMatches')}

        <a
          className={theme.viewAll}
          onClick={onViewAll}
          href={makeSearchUrl(query.get('q'), baseConfig)}
        >
          {translate('autocomplete.viewAllResults')}
        </a>
      </Title>
      <Grid
        columns={config.getIn(['breakpoints', 'products'], '12')}
        gutter={12}
        className={theme.list}
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
