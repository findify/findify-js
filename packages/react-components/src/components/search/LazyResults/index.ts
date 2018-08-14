/**
 * @module components/search/LazyResults
 */
import React, { Component, createElement } from 'react';
import { is, List, Map } from 'immutable';
import { connectItems } from '@findify/react-connect';
import { compose, withPropsOnChange, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import withLazy from 'helpers/withLazy';
import withColumns from 'helpers/withColumns';
import view from 'components/search/LazyResults/view';
import styles from 'components/search/LazyResults/styles.css';

export default compose(
  setDisplayName('LazyResults'),
  withTheme(styles),
  withColumns(),
  connectItems,
  withLazy(),
)(view);
