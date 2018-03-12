import React from 'react';
import {
  compose,
  defaultProps,
  mapProps,
  pure,
  setDisplayName,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose';
import view from './view';

const ProductCard = compose(
  setDisplayName('ProductCard'),
  pure,
  withHandlers({
    onClick: ({ onProductClick, ...rest }) => e => {
      if (onProductClick) {
        if (e && e.isDefaultPrevented && e.isDefaultPrevented()) return;
        e.preventDefault();
        return onProductClick(rest, e.ctrlKey || e.metaKey);
      }
    },
  }),
)(view);

export default ProductCard;
