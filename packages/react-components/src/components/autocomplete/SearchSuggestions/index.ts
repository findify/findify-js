/**
 * @module components/autocomplete/SearchSuggestions
 */
import { compose, setDisplayName } from 'recompose';
import { connectSuggestions, connectQuery } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import view from 'components/autocomplete/SearchSuggestions/view';
import styles from 'components/autocomplete/SearchSuggestions/styles.css';

export default compose(
  setDisplayName('SearchSuggestions'),
  withTheme(styles),
  connectSuggestions,
  connectQuery
)(view);
