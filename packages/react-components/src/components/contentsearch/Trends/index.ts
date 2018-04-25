import { compose, setDisplayName } from 'recompose'
import { connectConfig } from '@findify/react-connect';
import withTheme from 'helpers/withTheme'
import theme from 'components/contentsearch/Trends/styles.css'
import view from 'components/contentsearch/Trends/view'

export default compose(
  setDisplayName('Trends'),
  connectConfig,
  withTheme(theme)
)(view)
