import { compose, setDisplayName } from 'recompose'
import withTheme from 'helpers/withTheme'
import styles from './styles.css'
import view from './view'

export default compose(
  setDisplayName('SuggestionItem'),
  withTheme(styles)
)(view)
