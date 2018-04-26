import React from 'react';
import { connectQuery } from '@findify/react-connect';
import { compose, setDisplayName, withProps } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from 'components/search/Query/view';
import styles from 'components/search/Query/styles.css';

export default compose(
  setDisplayName('Query'),
  withTheme(styles),
  connectQuery,
)(view);
