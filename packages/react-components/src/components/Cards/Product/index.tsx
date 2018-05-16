/**
 * @module components/Cards/Product
 */

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
import pure from 'helpers/pure';
import { Map } from 'immutable'
import styles from './styles.css';
import view from 'components/Cards/Product/view';
import withTheme from 'helpers/withTheme';

const ProductCard: any = compose(
  pure,
  setDisplayName('ProductCard'),
  withTheme(styles)
)(view);

export default ProductCard;
