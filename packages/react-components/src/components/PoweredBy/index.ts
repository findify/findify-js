import { compose, setDisplayName } from 'recompose';
import { connectConfig } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';

import view from './view';

import styles from './styles.css';

export default compose(
  setDisplayName('PoweredBy'),
  withTheme(styles),
  connectConfig
)(view)
