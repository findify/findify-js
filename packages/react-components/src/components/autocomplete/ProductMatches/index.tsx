/**
 * @module components/autocomplete/ProductMatches
 */
import cx from 'classnames';
import styles from 'components/autocomplete/ProductMatches/styles.css';
import ProductCard from 'components/Cards/Product';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';

export default ({ theme = styles, config, isTrendingSearches }) => {
  const { items } = useItems<Immutable.AutocompleteConfig>();
  const translate = useTranslations();
  return (
    <div className={theme.root} display-if={items.size}>
      <h4 className={theme.title}>
        {isTrendingSearches
          ? translate('autocomplete.trendingProducts')
          : translate('autocomplete.productMatches')}
      </h4>
      <Grid columns={config.getIn(['breakpoints', 'grid'], '12')} gutter={12}>
        {MapArray({
          array: items,
          limit: config.getIn(['productMatches', 'limit']),
          factory: ProductCard,
          config: config.get('product'),
        })}
      </Grid>
    </div>
  );
};
