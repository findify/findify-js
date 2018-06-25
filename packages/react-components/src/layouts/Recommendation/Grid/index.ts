import React from 'react';
import { connectItems } from '@findify/react-connect';
import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import withMinResultsToShow from 'helpers/withMinResultsToShow';
import view from 'layouts/Recommendation/Grid/view';
import styles from 'layouts/Recommendation/Grid/styles.css';

export default compose(
  setDisplayName('GridRecommendation'),
  withTheme(styles),
  connectItems,
  withMinResultsToShow(),
)(view);
