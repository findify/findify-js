/**
 * @module layouts/Autocomplete/Dropdown
 */
import { compose, setDisplayName } from 'recompose'
import withTheme from 'helpers/withTheme'
import view from 'layouts/Autocomplete/Dropdown/view';
import styles from 'layouts/Autocomplete/Dropdown/styles.css';

export default compose(
  setDisplayName('Dropdown'),
  withTheme(styles)
)(view);
