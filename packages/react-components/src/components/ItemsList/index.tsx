import React from 'react';
import { compose, setDisplayName } from 'recompose';
import { connectItems } from '@findify/react-connect'
import view from 'components/ItemsList/view';
import pure from 'helpers/pure';

export default compose(
  setDisplayName('ItemsList'),
  connectItems,
  pure,
)(view)
