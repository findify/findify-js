import React from 'react'
import { compose, setDisplayName } from 'recompose'
import withTheme from 'helpers/withTheme'
import view from './view'
import styles from './styles.css'
import withAutocompleteLogic from '../withAutocompleteLogic';

export default compose(
  setDisplayName('Fullscreen'),
  withTheme(styles),
  withAutocompleteLogic,
)((props) => console.log('props', props) || React.createElement(view, props))
