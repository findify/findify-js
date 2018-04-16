import { createElement } from 'react';
import { hot } from 'react-hot-loader';
import { compose, withProps, withStateHandlers, setDisplayName, branch, withHandlers } from 'recompose';
import { connectConfig } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import withEvents from 'helpers/withEvents';
import { withDrawer } from "helpers/withDrawer";
import MobileFacets from 'components/search/MobileFacets';
import MobileSorting from 'components/search/MobileSorting';

import view from 'layouts/Search/view';
import styles from 'layouts/Search/styles.css';

const Search = compose(
  setDisplayName('Search'),

  withTheme(styles),

  connectConfig,

  withProps(({ config }) => ({
    isMobile: config.get('forceMobile') || window.innerWidth <= config.get('mobileBreakpoint'),
    filtersOnRight: config.get('filtersOnRight')
  })),

  branch(
    ({ isMobile }) => isMobile,
    compose(
      withProps({ theme: {} }),
      withDrawer('Filters', MobileFacets, '100%'),
      withDrawer('Sorting', MobileSorting, '100%'),
      withEvents({
        showMobileFacets: ({ showModal }) => () => showModal('Filters'),
        showMobileSort: ({ showModal }) => () => showModal('Sorting'),
        hideMobileFacets: ({ hideModal }) => () => hideModal('Filters'),
        hideMobileSort: ({ hideModal }) => () => hideModal('Sorting'),
      })
    )
  )
)(view);

export default hot(module)(Search)
