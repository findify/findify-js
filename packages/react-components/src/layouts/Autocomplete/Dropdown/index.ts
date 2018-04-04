import { connectConfig, connectSuggestions } from '@findify/react-connect';
import { compose, defaultProps, setDisplayName, lifecycle, withStateHandlers } from 'recompose'
import withTheme from 'helpers/withTheme'
import withAutocompleteLogic from '../withAutocompleteLogic'
import view from './view'
import styles from './styles.css'



export default compose(
  setDisplayName('Dropdown'),
  withTheme(styles),
  withAutocompleteLogic
)(view);
