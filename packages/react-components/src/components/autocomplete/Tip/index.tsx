import view from './view'
import styles from './styles.css'
import { compose, setDisplayName } from 'recompose'
import { connectSuggestions } from '@findify/react-connect';
import withTheme from '../../../helpers/withTheme';

export default compose(
  setDisplayName('Tip'),
  withTheme(styles),
  connectSuggestions,
)(view)
