import { createElement } from 'react';
import { connectConfig } from '@findify/react-connect';
import { createPortal } from '../../helpers/createPortal';

import Dropdown from './Dropdown';
import Fullscreen from './Fullscreen';

export const Autocomplete = connectConfig(({ config }) => {
  console.log(config);
  if (config.get('viewType') === 'simple') {
    return createElement(Dropdown);
  }
  if (config.get('viewType') === 'fullscreen') {
    return createPortal(Fullscreen);
  }
  return createPortal(Fullscreen)
});
