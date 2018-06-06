/**
 * @module components/Cards/Product/Rating
 */
import React from 'react';
import { setDisplayName, compose } from 'recompose'
import withTheme from 'helpers/withTheme'
import view from 'components/Cards/Product/Rating/view';
import theme from 'components/Cards/Product/Rating/styles.css';


export default compose(
  setDisplayName('Rating'),
  withTheme(theme)
)(view)
