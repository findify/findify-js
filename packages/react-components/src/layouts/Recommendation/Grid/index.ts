import React from 'react';
import { connectConfig } from '@findify/react-connect';
import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import view from 'layouts/Recommendation/Grid/view';
import styles from 'layouts/Recommendation/Grid/styles.css';

export default compose(
  setDisplayName('GridRecommendation'),
  withTheme(styles),
  connectConfig
)(view);
