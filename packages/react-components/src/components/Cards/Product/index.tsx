/**
 * @module components/Cards/Product
 */

import {
  compose,
  defaultProps,
  mapProps,
  setDisplayName,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose';
import pure from 'helpers/pure';

import styles from 'components/Cards/Product/styles.css';
import view from 'components/Cards/Product/view';
import withTheme from 'helpers/withTheme';

const ProductCard: any = compose(
  setDisplayName('ProductCard'),
  withTheme(styles)
)(view);

export default ProductCard;
