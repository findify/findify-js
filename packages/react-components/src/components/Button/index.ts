import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from './styles.css';

export default compose(
  setDisplayName('Button'),
  withTheme(styles)
)(view);
