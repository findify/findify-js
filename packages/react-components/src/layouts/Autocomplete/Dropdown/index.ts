import { connectConfig, connectSuggestions } from '@findify/react-connect';
import { compose, defaultProps, setDisplayName, lifecycle, withStateHandlers } from 'recompose'
import withTheme from 'helpers/withTheme'
import withAutocompleteLogic from 'layouts/Autocomplete/withAutocompleteLogic';
import view from 'layouts/Autocomplete/Dropdown/view';
import styles from 'layouts/Autocomplete/Dropdown/styles.css';
import trackPosition from './trackPosition';

export default compose(
  setDisplayName('Dropdown'),
  withTheme(styles),
  withAutocompleteLogic,
  trackPosition
)(view);
