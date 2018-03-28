import { compose, withHandlers, withStateHandlers, branch, renderNothing, setDisplayName } from 'recompose';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from "./styles.css";

export default compose(
  setDisplayName('MobileFacets'),

  withTheme(styles),
)(view);
