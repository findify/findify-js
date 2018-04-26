import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import view from 'components/Dropdown/view';
import styles from 'components/Dropdown/styles.css';

export default compose(
  setDisplayName('Dropdown'),
  withTheme(styles)
)(view)
