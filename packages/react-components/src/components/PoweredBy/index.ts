import { compose, setDisplayName } from 'recompose';
import { connectConfig } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';

import view from 'components/PoweredBy/view';

import styles from 'components/PoweredBy/styles.css';

export default compose(
  setDisplayName('PoweredBy'),
  withTheme(styles),
  connectConfig
)(view)
