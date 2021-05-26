/**
 * @module layouts/Autocomplete
 */

import { createElement, useMemo } from 'react';
import { useConfig } from '@findify/react-connect';
import { portal } from 'helpers/createPortal';
import Loadable from 'react-loadable';
import { Immutable, Types } from '@findify/store-configuration';
import useMedia from 'helpers/useMedia';
import { LayoutTypes } from './types';

/**
 * Layout factory is used to wrap Autocomplete layout in a div, containing data-findify-autocomplete-wrapper attribute,
 * which it requires in order to work correctly
 * @param type View type needed
 * @param props Props for React component
 */
const layoutFactory = (type: Types.AutocompleteTemplate, props) => () => {
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
const renderView = (type: Types.AutocompleteTemplate, props) =>
  (type === 'sidebar' ? portal : createElement)(layoutFactory(type, props));

const Autocomplete = ({ isTrendingSearches, ...rest }) => {
  const { config } = useConfig<Immutable.AutocompleteConfig>();
  const [isMobile, isDesktop] = useMedia([config.get('mobileBreakpoint')]);
  const size = isDesktop ? 'desktop' : 'mobile';
  const viewType = config.getIn([size, 'template']);
  const isFullScreen = viewType === 'fullscreen';

  return renderView(isFullScreen ? 'dropdown' : viewType, {
    ...rest,
    config: config.merge(config.get(size)),
    isMobile,
    isFullScreen,
    isTrendingSearches,
  });
};

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Autocomplete)
  : Autocomplete;
