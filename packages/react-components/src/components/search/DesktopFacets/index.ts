import { compose, setDisplayName, withHandlers } from 'recompose';
import { connectFacets } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';

import view from 'components/search/DesktopFacets/view';
import styles from 'components/search/DesktopFacets/styles.css';

export default compose(
  setDisplayName('DesktopFacets'),

  withTheme(styles),

  connectFacets,

  withHandlers({
    onReset: ({ update, meta }) => () =>  update('filters', f => f && f.clear()) // Reset values
  })
  
)(view);
