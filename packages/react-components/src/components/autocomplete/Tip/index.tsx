import view from './view'
import styles from './styles.css'
import { compose } from 'recompose'
import { connectQuery } from '@findify/react-connect';
import withTheme from '../../../helpers/withTheme';

export default compose(
  withTheme(styles),
  connectQuery,
)(view)
