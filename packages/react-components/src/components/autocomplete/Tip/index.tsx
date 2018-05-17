/**
 * @module components/autocomplete/Tip
 */

import view from 'components/autocomplete/Tip/view';
import styles from 'components/autocomplete/Tip/styles.css';
import { compose, setDisplayName } from 'recompose'
import { connectSuggestions } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';

export default compose(
  setDisplayName('Tip'),
  withTheme(styles),
  connectSuggestions,
)(view)
