/**
 * @module components/autocomplete/SuggestionItem
 */

import { compose, setDisplayName } from 'recompose'
import withTheme from 'helpers/withTheme'
import styles from 'components/autocomplete/SuggestionItem/styles.css';
import view from 'components/autocomplete/SuggestionItem/view';

export default compose(
  setDisplayName('SuggestionItem'),
  withTheme(styles)
)(view)
