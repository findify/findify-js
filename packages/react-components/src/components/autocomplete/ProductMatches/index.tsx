/**
 * @module components/autocomplete/ProductMatches
 */

import styles from 'components/autocomplete/ProductMatches/styles.css';
import ProductCard from 'components/Cards/Product';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';

export default ({ theme = styles, config }) => {
  const { items } = useItems<Immutable.AutocompleteConfig>();
  console.log(config.getIn(['breakpoints', 'grid']).toJS());
  return (
    <div className={theme.root} display-if={!!items.size}>
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
