import { compose, withHandlers, setDisplayName } from 'recompose';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from 'components/search/DesktopActions/view';
import styles from 'components/search/DesktopActions/styles.css';

export default compose(
  setDisplayName('DesktopActions'),
  withTheme(styles),
)(view);
