import React from 'react';
import {
  compose,
  defaultProps,
  mapProps,
  setDisplayName,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose';
import styles from 'components/productcard/ProductCard/styles.css';
import view from 'components/productcard/ProductCard/view';
import withTheme from 'helpers/withTheme';

const ProductCard: any = compose(
  setDisplayName('ProductCard'),
  withTheme(styles)
)(view);

export default ProductCard;
