/**
 * @module components/search/StaticResults
 */
import React from 'react';
import { compose, setDisplayName, withPropsOnChange } from 'recompose';
import { connectConfig } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import withColumns from 'helpers/withColumns';

import view from 'components/search/StaticResults/view';
import styles from 'components/search/StaticResults/styles.css';

export default compose(
  setDisplayName('StaticResults'),

  withTheme(styles),

  connectConfig,

  withColumns()

)(view);
