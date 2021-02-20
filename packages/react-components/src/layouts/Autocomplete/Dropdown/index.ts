/**
 * @module layouts/Autocomplete/Dropdown
 */
import { connectSuggestions } from '@findify/react-connect';
import { compose, setDisplayName } from 'recompose'
import withTheme from 'helpers/withTheme'
import withAutocompleteLogic from 'layouts/Autocomplete/withAutocompleteLogic';
import view from 'layouts/Autocomplete/Dropdown/view';
import styles from 'layouts/Autocomplete/Dropdown/styles.css';

export default compose(
  setDisplayName('Dropdown'),
  withTheme(styles),
  withAutocompleteLogic
)(view);
