import { createElement } from 'react';
import { hot } from 'react-hot-loader';
import { connectConfig } from '@findify/react-connect';
import { createPortal } from 'helpers/createPortal';

import Dropdown from 'layouts/Autocomplete/Dropdown';
import Sidebar from 'layouts/Autocomplete/Sidebar';
import Fullscreen from 'layouts/Autocomplete/Fullscreen';

const Autocomplete = connectConfig(({ config, ...rest }) => {
  const isMobile = window.innerWidth < config.get('mobileBreakpoint')
  if (config.get('viewType') === 'simple') {
    return createElement(isMobile ? Sidebar : Dropdown, { isMobile });
  }
  if (config.get('viewType') === 'fullscreen') {
    return createPortal(Fullscreen, { isMobile: true });
  }
  return createPortal(Fullscreen)
});

export default hot(module)(Autocomplete);
