/**
 * @module components/Banner
 */
import React from 'react';
import { connectBanner } from '@findify/react-connect';
import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import styles from './styles.css';
import view from './view';

export default compose(
  setDisplayName('Banner'),
  withTheme(styles),
  connectBanner
)(view);
