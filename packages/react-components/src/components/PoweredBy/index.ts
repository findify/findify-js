import { compose, defaultProps } from 'recompose';
import { connectConfig } from '@findify/react-connect';

import view from './view';

import theme from './styles.css';

export default compose(
  defaultProps({ theme }),
  connectConfig
)(view)
