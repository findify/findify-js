import { Component, createElement } from 'react';
import { is, List, Map } from 'immutable';
import { connectItems } from '@findify/react-connect';
import { compose, withPropsOnChange, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import withLazy from 'helpers/withLazy';
import sizeMe from 'react-sizeme';

import view from 'components/contentsearch/LazyContentSearchResults/view';
import styles from 'components/contentsearch/LazyContentSearchResults/styles.css';

export default compose(
  setDisplayName('LazyContentSearchResults'),
  withTheme(styles),
  connectItems,
  withLazy(),
)(view);
