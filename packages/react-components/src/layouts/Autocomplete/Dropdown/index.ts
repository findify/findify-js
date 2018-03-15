import { connectConfig } from '@findify/react-connect';
import { compose, defaultProps } from 'recompose';
import view from './view'
import styles from './styles.css'

export default compose(
  connectConfig,
  defaultProps({ theme: styles })
)(view);
