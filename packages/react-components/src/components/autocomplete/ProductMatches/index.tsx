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

export default ({ theme = styles, padded }) => {
  const { items, config } = useItems<Immutable.AutocompleteConfig>();
  return (
    <div className={cx(theme.root, {
      [theme.padded]: padded
    })} display-if={!!items.size}>
      <Grid columns='3'>
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
