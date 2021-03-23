import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import view from 'layouts/Autocomplete/Sidebar/view';
import styles from 'layouts/Autocomplete/Sidebar/styles.css';
import withAutocompleteLogic from 'layouts/Autocomplete/withAutocompleteLogic';
import { connectSuggestions } from '@findify/react-connect';

export default compose(
  setDisplayName('Sidebar'),
  withTheme(styles),
  connectSuggestions
)(view);
