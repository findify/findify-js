import { compose, setDisplayName } from 'recompose';
import { connectFacets } from '@findify/react-connect';

import view from './view';

export default compose(
  setDisplayName('DesktopFacets'),
  connectFacets
)(view);
