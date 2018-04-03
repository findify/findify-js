import { compose, setDisplayName } from 'recompose'
import { connectSuggestions, connectQuery } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import view from './view'
import styles from './styles.css'


export default compose(
  setDisplayName('SearchSuggestions'),
  withTheme(styles),
  connectSuggestions,
  connectQuery
)(view)
