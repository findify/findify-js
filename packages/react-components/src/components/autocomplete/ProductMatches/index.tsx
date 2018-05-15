import React from 'react';
import {
  compose,
  mapProps,
  setDisplayName,
  defaultProps,
  withPropsOnChange,
  pure
} from 'recompose';
import { connectItems, connectSuggestions } from '@findify/react-connect';
import sizeMe from 'react-sizeme';
import view from 'components/autocomplete/ProductMatches/view';
import styles from 'components/autocomplete/ProductMatches/styles.css';
import withTheme from 'helpers/withTheme';

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
  withTheme(styles),
  /*
  sizeMe({ refreshRate: 100, refreshMode: 'debounce' }),
  withPropsOnChange(['size'], ({ size }) => ({
    columns: countColumns(size.width),
  })),*/
  connectSuggestions,
  connectItems,
  pure,
)(view);

export default ProductMatches
