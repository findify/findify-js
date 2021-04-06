/**
 * @module layouts/Autocomplete
 */

import { createElement, useMemo } from 'react';
import { useConfig } from '@findify/react-connect';
import { portal } from 'helpers/createPortal';
import Loadable from 'react-loadable';
import chunks from 'helpers/chunks';
import { Immutable } from '@findify/store-configuration';
import useMedia from 'helpers/useMedia';

/** View type to View component mapping */
const LayoutTypes = {
  sidebar: chunks.autocomplete.sidebar,
  dropdown: chunks.autocomplete.dropdown,
  fullscreen: chunks.autocomplete.fullscreen,
};

/** Possible Autocomplete view types */
type AutocompleteType = keyof typeof LayoutTypes;

/**
 * Layout factory is used to wrap Autocomplete layout in a div, containing data-findify-autocomplete-wrapper attribute,
 * which it requires in order to work correctly
 * @param type View type needed
 * @param props Props for React component
 */
const layoutFactory = (type: AutocompleteType, props) => () => {
  const Component = useMemo(
    () => Loadable({ loader: LayoutTypes[type], loading: () => null }),
    []
  );
  return (
    <div data-findify-autocomplete-wrapper="true">
      <Component {...props} />
    </div>
  );
};

/**
 * Used to render view either in a portal or in place
 * @param type View type needed
 * @param props Props for React component
 */
const renderView = (type: AutocompleteType, props) =>
  (type === 'sidebar' ? portal : createElement)(layoutFactory(type, props));

const Autocomplete = ({ isTrendingSearches, ...rest }) => {
  const { config } = useConfig<Immutable.AutocompleteConfig>();
  const [isMobile, isDesktop] = useMedia([config.get('mobileBreakpoint')]);

  const viewType: AutocompleteType = isDesktop
    ? config.getIn(['template', 'desktop'])
    : config.getIn(['template', 'mobile']);

  const templateSetting = config.get(viewType);

  const showSuggestions = !isMobile || !!templateSetting?.getIn(['suggestions', 'display']);

  return renderView(viewType, {
    ...rest,
    config,
    isMobile,
    showSuggestions,
    isTrendingSearches,
  });
};

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Autocomplete)
  : Autocomplete;
