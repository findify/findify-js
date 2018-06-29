/**
 * @module layouts/ContentSearch
 */

import React, { createElement } from 'react';
import { hot } from 'react-hot-loader';
import { compose, withProps, withStateHandlers, setDisplayName, branch, withHandlers, renderNothing } from 'recompose';
import { connectItems } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import withEvents from 'helpers/withEvents';
import withErrorHandler from 'helpers/withErrorHandler';
import { withDrawer } from "helpers/withDrawer";
import MobileFacets from 'components/search/MobileFacets';
import MobileSorting from 'components/search/MobileSorting';

import view from 'layouts/ContentSearch/view';
import styles from 'layouts/ContentSearch/styles.css';

/** React component encapsulating most of UI logic inside ContentSearch */
const ContentSearch = compose(
  setDisplayName('ContentSearch'),

  withTheme(styles),

  withErrorHandler,

  connectItems,

  branch(
    ({ items }) => !items.size,
    renderNothing
  ),

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

export default hot(module)(ContentSearch)
