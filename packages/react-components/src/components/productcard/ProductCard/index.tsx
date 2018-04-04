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
import view from './view';
import styles from './styles.css'
import withTheme from 'helpers/withTheme';

const ProductCard: any = compose(
  setDisplayName('ProductCard'),
  withTheme(styles)
)(view);

export default ProductCard;
