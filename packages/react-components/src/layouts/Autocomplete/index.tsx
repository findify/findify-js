/**
 * @module layouts/Autocomplete
 */

import { createElement } from 'react';
import { hot } from 'react-hot-loader';
import { connectSuggestions } from '@findify/react-connect';
import { createPortal } from 'helpers/createPortal';

import Dropdown from 'layouts/Autocomplete/Dropdown';
import Sidebar from 'layouts/Autocomplete/Sidebar';
import Fullscreen from 'layouts/Autocomplete/Fullscreen';

/** Possible Autocomplete view types */
type AutocompleteType = 'fullscreen' | 'sidebar' | 'dropdown';

/** View type to View component mapping */
const LayoutTypes = {
  dropdown: Dropdown,
  sidebar: Sidebar,
  fullscreen: Fullscreen
}

/**
 * Used to render view either in a portal or in place
 * @param type View type needed
 * @param props Props for React component
 */
const renderView = (type, props) => (
  (type === 'sidebar' ? createPortal : createElement)(LayoutTypes[type] || Fullscreen, props)
)

const Autocomplete = connectSuggestions(({ config, isTrendingSearches,...rest }) => {
  const isMobile = window.innerWidth < config.get('mobileBreakpoint')
  const viewType: AutocompleteType = isMobile && config.get('mobileViewType', 'sidebar') || config.get('viewType', 'simple')

  return renderView(viewType, { ...rest, config, isMobile, isTrendingSearches })
});

export default hot(module)(Autocomplete);
