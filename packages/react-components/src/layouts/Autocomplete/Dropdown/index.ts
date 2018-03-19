import { connectConfig } from '@findify/react-connect';
import { compose, defaultProps, setDisplayName } from 'recompose';
import view from './view'
import styles from './styles.css'
import withTheme from '../../../helpers/withTheme';

export default compose(
  connectConfig,
  setDisplayName('Dropdown'),
  withTheme(styles)
)(view);
