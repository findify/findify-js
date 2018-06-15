/**
 * @module components/search/DesktopActions
 */
import React from 'react';
import { compose, withHandlers, setDisplayName, branch, withStateHandlers } from 'recompose';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';
import { connectConfig } from '@findify/react-connect';

import view from 'components/search/DesktopActions/view';
import styles from 'components/search/DesktopActions/styles.css';

export default compose(
  setDisplayName('DesktopActions'),
  withTheme(styles),
  connectConfig,
  branch(
    ({ config }) => config.get('hidableFacets'),
    compose(
      withStateHandlers(
        { facetsVisible: true },
        {
          hideFacets: () => () => ({ facetsVisible: false }),
          showFacets: () => () => ({ facetsVisible: true })
        }
      ),
      withEvents({
        hideFacets: ({ hideFacets }) => hideFacets()
      }),
      withHandlers({
        showFacets: ({ showFacets, emit }) => () => {
          showFacets();
          emit('showFacets');
        }
      })
    )
  )
)(view);
