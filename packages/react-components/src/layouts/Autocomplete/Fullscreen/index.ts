/**
 * @module layouts/Autocomplete/Fullscreen
 */

import React from 'react'
import { compose, setDisplayName } from 'recompose'
import withTheme from 'helpers/withTheme'
import view from 'layouts/Autocomplete/Fullscreen/view';
import styles from 'layouts/Autocomplete/Fullscreen/styles.css';
import withAutocompleteLogic from 'layouts/Autocomplete/withAutocompleteLogic';

export default compose(
  setDisplayName('Fullscreen'),
  withTheme(styles),
)(view)
