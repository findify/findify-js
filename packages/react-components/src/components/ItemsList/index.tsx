import { compose, setDisplayName } from 'recompose';
import { connectItems } from '@findify/react-connect'
import view from './view'

export default compose(
  setDisplayName('ItemsList'),
  connectItems
)(view)
