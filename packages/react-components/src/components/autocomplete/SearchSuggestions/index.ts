import { compose, setDisplayName } from 'recompose'
import { connectSuggestions, connectQuery } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import styles from './styles.css'
import view from './view'


export default compose(
  setDisplayName('SearchSuggestions'),
  withTheme(styles),
  connectSuggestions,
  connectQuery
)(view)
