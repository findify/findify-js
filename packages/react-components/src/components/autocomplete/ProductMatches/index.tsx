/**
 * @module components/autocomplete/ProductMatches
 */

import {
  compose,
  setDisplayName,
} from 'recompose';
import view from 'components/autocomplete/ProductMatches/view';
import styles from 'components/autocomplete/ProductMatches/styles.css';
import withTheme from 'helpers/withTheme';


export default compose(
  setDisplayName('ProductMatches'),
  withTheme(styles),
)(view);
