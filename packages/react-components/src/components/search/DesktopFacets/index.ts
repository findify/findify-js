/**
 * @module components/search/DesktopFacets
 */
import {
  compose,
  setDisplayName,
  withHandlers,
  withStateHandlers,
  branch,
} from 'recompose';
import { connectFacets } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';

import view from 'components/search/DesktopFacets/view';
import styles from 'components/search/DesktopFacets/styles.css';
import withEvents from 'helpers/withEvents';

export default compose(
  setDisplayName('DesktopFacets'),

  withTheme(styles),

  connectFacets,

  withHandlers({
    onReset: ({ update, meta }) => () =>
      update('filters', (f) => f && f.clear()), // Reset values
  }),

  branch(
    ({ config }) => config.get('hidableFacets'),
    compose(
      withStateHandlers(
        { visible: true },
        {
          hideFacets: () => () => ({ visible: false }),
          showFacets: () => () => ({ visible: true }),
        }
      ),
      withEvents({
        showFacets: ({ showFacets }) => showFacets,
      }),
      withHandlers({
        hideFacets: ({ hideFacets, emit }) => () => {
          hideFacets();
          emit('hideFacets');
        },
      })
    )
  )
)(view);
