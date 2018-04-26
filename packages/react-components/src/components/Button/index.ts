import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from 'components/Button/view';
import styles from 'components/Button/styles.css';

export default compose<any, any>(
  setDisplayName('Button'),
  withTheme(styles)
)(view);
