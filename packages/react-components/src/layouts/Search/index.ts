import { createElement } from 'react';
import { hot } from 'react-hot-loader';
import { compose, withProps, withStateHandlers } from 'recompose';
import { connectConfig } from '@findify/react-connect';

import view from './view';

const Search = compose(
  connectConfig,
  withStateHandlers(
    { mobileFacetsVisible: false },
    { showMobileFacets: () => () => ({ mobileFacetsVisible: true })}
  ),
  withProps(({ config }) => ({
    isMobile: config.get('forceMobile') || window.innerWidth <= config.get('mobileBreakpoint')
  }))
)(view);

export default hot(module)(Search)
