/**
 * @module components/autocomplete/ProductMatches
 */

import styles from 'components/autocomplete/ProductMatches/styles.css';
import ProductCard from 'components/Cards/Product';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';

export default ({ theme = styles, config: autocompleteConfig }) => {
  const { items, config } = useItems<Immutable.AutocompleteConfig>();
  const productTemplate = autocompleteConfig.getIn(['product', 'template']);
  return (
    <div className={theme.root} display-if={!!items.size}>
      <Grid columns={productTemplate === 'vertical' ? '4' : config.getIn(['breakpoints', 'grid'], '12')}>
        {MapArray({
          array: items,
          limit: config.getIn(['defaultRequestParams', 'item_limit']),
          factory: ProductCard,
          config: autocompleteConfig.get('product'),
        })}
      </Grid>
    </div >
  );
};
