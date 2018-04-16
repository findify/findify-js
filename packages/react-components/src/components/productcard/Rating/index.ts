import { setDisplayName, compose } from 'recompose'
import withTheme from 'helpers/withTheme'
import view from 'components/productcard/Rating/view';
import theme from 'components/productcard/Rating/styles.css';


export default compose(
  setDisplayName('Rating'),
  withTheme(theme)
)(view)
