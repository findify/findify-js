import { setDisplayName, compose } from 'recompose'
import withTheme from 'helpers/withTheme'
import theme from './styles.css'
import view from './view'


export default compose(
  setDisplayName('Rating'),
  withTheme(theme)
)(view)
