import { compose, setDisplayName } from 'recompose';
import { connectItems } from '@findify/react-connect'
import view from 'components/ItemsList/view';

export default compose(
  setDisplayName('ItemsList'),
  connectItems
)(view)
