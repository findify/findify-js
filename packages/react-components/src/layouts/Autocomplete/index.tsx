import { createElement } from 'react';
import { hot } from 'react-hot-loader';
import { connectConfig } from '@findify/react-connect';
import { createPortal } from '../../helpers/createPortal';

import Dropdown from './Dropdown';
import Fullscreen from './Fullscreen';

const Autocomplete = connectConfig(({ config }) => {
  if (config.get('viewType') === 'simple') {
    return createElement(Dropdown);
  }
  if (config.get('viewType') === 'fullscreen') {
    return createPortal(Fullscreen);
  }
  return createPortal(Fullscreen)
});

export default hot(module)(Autocomplete);
