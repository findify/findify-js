import { compose, setDisplayName } from 'recompose';
import { connectItems } from '@findify/react-connect';
import view from 'components/ItemsList/view';
import pure from 'helpers/pure';
import deprecated from 'helpers/deprecated';

export default compose(
  setDisplayName('ItemsList'),
  deprecated('ItemsList'),
  connectItems,
  pure
)(view);
