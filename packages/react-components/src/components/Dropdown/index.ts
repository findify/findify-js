/**
 * @module components/Dropdown
 */

import { compose, setDisplayName, withPropsOnChange } from 'recompose';
import withTheme from 'helpers/withTheme';
import view from 'components/Dropdown/view';
import styles from 'components/Dropdown/styles.css';
import { isImmutable, fromJS } from 'immutable';

export default compose(
  setDisplayName('Dropdown'),
  withTheme(styles),
  withPropsOnChange(['items'], ({ items }) => ({
    items: isImmutable(items) ? items : fromJS(items)
  }))
)(view)
