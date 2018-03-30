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

const ProductCard = compose(
  setDisplayName('ProductCard'),
  withHandlers({
    onClick: ({ onProductClick, ...rest }) => e => {
      if (onProductClick) {
        if (e && e.isDefaultPrevented && e.isDefaultPrevented()) return;
        e.preventDefault();
        return onProductClick(rest, e.ctrlKey || e.metaKey);
      }
    },
  }),
  withTheme(styles)
)(view);

export default ProductCard;
