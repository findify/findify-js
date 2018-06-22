/**
 * @module components/search/MobileActions
 */
import React from 'react';
import { connectSort, connectQuery } from '@findify/react-connect';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from 'components/search/MobileActions/view';
import styles from 'components/search/MobileActions/styles.css';

export default compose(
  withTheme(styles),
  connectSort,
  connectQuery,
  withEvents(),
  withHandlers({
    showFacets: ({ emit }) => () => emit('showMobileFacets'),
    showSort: ({ emit }) => () => emit('showMobileSort')
  }),
  withPropsOnChange(['selected'], ({ selected, config }) => ({
    sorting: config.getIn(['sorting', 'i18n', 'options', !!selected
      && [selected.get('field'), selected.get('order')].join('|')
      || 'default'
    ])
  })),
  withPropsOnChange(['query'], ({ query }) => query.get('filters') && ({
    total: query.get('filters').reduce(
      // The workaround to not sum the nested category filters
      (acc, filter, key) =>  acc + (/category[2-9]/.test(key) ? 0 : filter.size)
    , 0)
  }))
)(view);
