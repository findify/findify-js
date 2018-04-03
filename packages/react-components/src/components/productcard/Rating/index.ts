import { setDisplayName, compose } from 'recompose'
import withTheme from 'helpers/withTheme'
import view from './view'
import theme from './styles.css'


export default compose(
  setDisplayName('Rating'),
  withTheme(theme)
)(view)
