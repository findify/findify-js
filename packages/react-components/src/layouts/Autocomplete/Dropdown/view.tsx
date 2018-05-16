/**
 * @module layouts/Autocomplete/Dropdown
 */

import React from 'react';
import Drawer from 'components/common/Drawer'
import Tip from 'components/autocomplete/Tip'
import ProductMatches from 'components/autocomplete/ProductMatches'
import SearchSuggestions from 'components/autocomplete/SearchSuggestions'
import MapArray from 'components/common/MapArray';
import Branch from 'components/common/Branch'
import { connectSuggestions, connectItems } from '@findify/react-connect';
import { withDrawer } from 'helpers/withDrawer';
import cx from 'classnames';
import { ThemedSFCProps, MJSConfiguration, ISuggestion, MJSValue } from '../../../types';
import { List } from 'immutable';

interface IAutocompletePanel extends ThemedSFCProps {
  config: MJSConfiguration;
  isTrendingSearches?: boolean;
  [x: string]: any;
}

/** Layout column mapping */
const LayoutColumns = {
  SearchSuggestions: ((({ config, theme, isTrendingSearches, ...rest }: IAutocompletePanel) => (
    <div className={theme.suggestionsContainer}>
      <h4 className={cx(theme.typeTitle, theme.suggestionsTitle, {[theme.trendingTitle]: isTrendingSearches})}>{config.getIn(['i18n', isTrendingSearches ? 'trendingSearches'  : 'suggestionsTitle'])}</h4>
      <SearchSuggestions
        className={theme.searchSuggestions}
        widgetKey={config.get('widgetKey')}
        isTrendingSearches={isTrendingSearches}
        {...rest} />
    </div>
  )) as React.SFC<IAutocompletePanel>),
  ProductMatches: ((({ config, theme, isTrendingSearches, ...rest}: IAutocompletePanel) => (
    <div className={theme.productMatchesContainer}>
      <h4 className={cx(theme.typeTitle, {[theme.trendingTitle]: isTrendingSearches})}>{config.getIn(['i18n', isTrendingSearches ? 'trendingProducts' : 'productMatchesTitle'])}</h4>
      <ProductMatches className={theme.productMatches} config={config} {...rest} />
    </div>
  )) as React.SFC<IAutocompletePanel>)
}

/** Props that SearchOrZero component accepts */
interface ISearchOrZeroProps {
  /** List of search suggestions */
  suggestions: List<ISuggestion>;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** MJS API Request Meta */
  meta: Map<string, MJSValue>;
  /** Selected suggestion index. -1 means no suggestion is selected on keyboard */
  selectedSuggestion: number;
  /** Flag that shows if autocomplete is running in TrendingSearches mode */
  isTrendingSearches: boolean;
  /** Rest of the props passed down to panels */
  [x: string]: any;
}

const SearchOrZero: React.SFC<ISearchOrZeroProps> = ({
  suggestions,
  config,
  theme,
  meta,
  selectedSuggestion,
  isTrendingSearches,
  ...rest
}: ISearchOrZeroProps) => (
  <Branch
    condition={suggestions && suggestions.size > 0}
    left={() => (
      <MapArray
        array={config.get('viewOrder', ["SearchSuggestions", "ProductMatches"])}
        keyAccessor={item => item}
        factory={({ item }: ({ item: 'SearchSuggestions' | 'ProductMatches' })) =>
          React.createElement(
            LayoutColumns[item],
            {
              config,
              theme,
              isTrendingSearches,
              meta,
              ...(item === 'SearchSuggestions' ? {selectedSuggestion, icon: isTrendingSearches ? 'Star' : undefined} : {}),
              ...rest })
        } />
    )} />
)

interface IAutocompleteDropdownProps {
  /** List of search suggestions */
  suggestions: List<ISuggestion>;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** MJS API Request Meta */
  meta: Map<string, MJSValue>;
  /** Selected suggestion index. -1 means no suggestion is selected on keyboard */
  selectedSuggestion: number;
  /** Flag that shows if autocomplete is running in TrendingSearches mode */
  isTrendingSearches: boolean;
  /** Rest of the props passed down to panels */
  [x: string]: any;
}

const AutocompleteDropdownView: React.SFC<IAutocompleteDropdownProps> = ({
  config,
  theme,
  meta,
  suggestions,
  ...rest
}: IAutocompleteDropdownProps) => (
<div display-if={suggestions && suggestions.size > 0} className={theme.wrapper}>
  <div className={theme.overlay} display-if={config.get('showOverlay')}></div>
  <div
    className={theme.root}
    data-findify-autocomplete={true}
    ref={innerRef}
    style={{ [position]: 0 }}>
    <Tip
      className={theme.tip}
      title={config.getIn(['i18n', 'tipResults'])}
      widgetKey={config.get('widgetKey')} />
    <div className={theme.container}>
      <SearchOrZero
        theme={theme}
        meta={meta}
        config={config}
        suggestions={suggestions}
        {...rest} />
    </div>
  </div>
</div>

export default AutocompleteDropdownView;

