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

export default ({ theme = styles, config, padded = false }) => {
  const { items } = useItems<Immutable.AutocompleteConfig>();
  return (
    <div
      className={cx(theme.root, padded && theme.padded)}
      display-if={items.size}
    >
      <Grid columns={config.getIn(['breakpoints', 'grid'], '12')}>
        {MapArray({
          array: items,
          limit: config.getIn(['defaultRequestParams', 'item_limit']),
          factory: ProductCard,
          config: config.get('product'),
        })}
      </Grid>
    </div>
  );
};
