import { createElement } from 'react';
import { hot } from 'react-hot-loader';
import { connectConfig } from '@findify/react-connect';
import { createPortal } from 'helpers/createPortal';

import Dropdown from 'layouts/Autocomplete/Dropdown';
import Sidebar from 'layouts/Autocomplete/Sidebar';
import Fullscreen from 'layouts/Autocomplete/Fullscreen';

type AutocompleteType = 'fullscreen' | 'sidebar' | 'dropdown';

const LayoutTypes = {
  dropdown: Dropdown,
  sidebar: Sidebar,
  fullscreen: Fullscreen
}

const renderView = (type, props) => (
  (type === 'fullscreen' ? createPortal : createElement)(LayoutTypes[type] || Fullscreen, props)
)

const Autocomplete = connectConfig(({ config, ...rest }) => {
  const isMobile = window.innerWidth < config.get('mobileBreakpoint')
  const viewType: AutocompleteType = isMobile && config.get('mobileViewType', 'fullscreen') || config.get('viewType', 'simple')

  return renderView(viewType, { isMobile })
});

export default hot(module)(Autocomplete);
