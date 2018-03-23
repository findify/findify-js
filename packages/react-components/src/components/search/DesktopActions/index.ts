import { compose, withHandlers, setDisplayName } from 'recompose';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from "./styles.css";

export default compose(
  setDisplayName('DesktopActions'),
  withTheme(styles),
)(view);
