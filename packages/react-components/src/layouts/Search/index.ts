import { createElement } from 'react';
import { hot } from 'react-hot-loader';
import { compose, withProps, withStateHandlers, setDisplayName, branch } from 'recompose';
import { connectConfig } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import MobileFacets from 'components/search/MobileFacets';
import withEvents from 'helpers/withEvents';

import view from './view';
import styles from './styles.css';

const Search = compose(
  setDisplayName('Search'),

  withTheme(styles),

  connectConfig,

  withProps(({ config }) => ({
    isMobile: config.get('forceMobile') || window.innerWidth <= config.get('mobileBreakpoint'),
    filtersOnRight: config.get('filtersOnRight')
  })),
)(view);

export default hot(module)(Search)
