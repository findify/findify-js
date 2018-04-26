import React from 'react'
import { compose, setDisplayName } from 'recompose'
import withTheme from 'helpers/withTheme'
import view from 'layouts/Autocomplete/Sidebar/view';
import styles from 'layouts/Autocomplete/Sidebar/styles.css';
import withAutocompleteLogic from 'layouts/Autocomplete/withAutocompleteLogic';

export default compose(
  setDisplayName('Sidebar'),
  withTheme(styles),
  withAutocompleteLogic,
)((props) => console.log('props', props) || React.createElement(view, props))
