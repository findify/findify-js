/**
 * @module components/search/MobileFacets
 */
import React from 'react';
import { compose, withStateHandlers, setDisplayName, withProps, withPropsOnChange, withHandlers } from 'recompose';
import { connectFacets, connectQuery } from '@findify/react-connect';

import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from 'components/search/MobileFacets/view';
import styles from 'components/search/MobileFacets/styles.css';

export default compose(
  setDisplayName('MobileFacets'),

  withTheme(styles),

  connectFacets,
  connectQuery,

  withHandlers({
    onReset: ({ update, meta }) => () =>  update('filters', f => f && f.clear()), // Reset values
    hideModal: ({ hideModal }) => () =>  hideModal('Filters') // Reset values
  }),

  withStateHandlers<{activeFacet: string | boolean}, any, any>(
    { activeFacet: false },
    { selectFacet: () => name => ({ activeFacet: typeof name === 'string' ? name : false }) }
  ),

  withPropsOnChange(['activeFacet', 'facets'], ({ activeFacet, facets }) => ({
    activeFacet: activeFacet && facets.find(f => f.get('name') === activeFacet),
  })),

  withPropsOnChange(['activeFacet'], ({ activeFacet }) => ({
    filtersSelected: activeFacet && activeFacet.get('values').filter(item => item.get('selected')).size
  })),

  withPropsOnChange(['query'], ({ query }) => query.get('filters') && ({
    total: query.get('filters').reduce(
      // The workaround to not sum the nested category filters
      (acc, filter, key) =>  acc + (/category[2-9]/.test(key) ? 0 : filter.size)
    , 0)
  }))

)(view);
