/**
 * @module layouts/Autocomplete
 */

import React, { createElement } from 'react';
import { hot } from 'react-hot-loader';
import { connectSuggestions } from '@findify/react-connect';
import { portal } from 'helpers/createPortal';

import Dropdown from 'layouts/Autocomplete/Dropdown';
import Sidebar from 'layouts/Autocomplete/Sidebar';
import Fullscreen from 'layouts/Autocomplete/Fullscreen';

/** View type to View component mapping */
const LayoutTypes = {
  dropdown: Dropdown,
  sidebar: Sidebar,
  fullscreen: Fullscreen
}

/** Possible Autocomplete view types */
type AutocompleteType = keyof typeof LayoutTypes;


// TODO: possibly migrate data-findify-autocomplete=true there as well
/**
 * Layout factory is used to wrap Autocomplete layout in a div, containing data-findify-autocomplete-wrapper attribute,
 * which it requires in order to work correctly
 * @param type View type needed
 * @param props Props for React component
 */
const layoutFactory = (type: AutocompleteType, props) => () => (
  <div data-findify-autocomplete-wrapper="true">{createElement(LayoutTypes[type] || Fullscreen, props)}</div>
)

/**
 * Used to render view either in a portal or in place
 * @param type View type needed
 * @param props Props for React component
 */
const renderView = (type: AutocompleteType, props) => (
  (type === 'sidebar' ? portal : createElement)(layoutFactory(type, props))
)

const Autocomplete = connectSuggestions(({ config, isTrendingSearches,...rest }) => {
  const isMobile = window.innerWidth < config.get('mobileBreakpoint')
  const viewType: AutocompleteType = isMobile && config.get('mobileViewType', 'sidebar') || config.get('viewType', 'simple')

  return renderView(viewType, { ...rest, config, isMobile, isTrendingSearches })
});

export default hot(module)(Autocomplete);
