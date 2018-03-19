import React from 'react';
import {
  compose,
  mapProps,
  setDisplayName,
  defaultProps,
  withPropsOnChange,
} from 'recompose';
import { connectItems } from '@findify/react-connect';
import sizeMe from 'react-sizeme';
import ProductCard from '../ProductCard';
import view from './view'

const countColumns = width => {
  if (width > 1900) return 8;
  if (width > 1100) return 6;
  if (width > 700) return 4;
  if (width > 400) return 3;
  return 2;
};


const ProductMatches = compose(
  setDisplayName('ProductMatches'),
  defaultProps({ columns: 3 }),
  /*
  sizeMe({ refreshRate: 100, refreshMode: 'debounce' }),
  withPropsOnChange(['size'], ({ size }) => ({
    columns: countColumns(size.width),
  })),*/
  connectItems,
)(view);

export default ProductMatches
