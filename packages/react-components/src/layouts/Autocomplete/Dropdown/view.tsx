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

const LayoutColumns = {
  SearchSuggestions: ({ config, theme, suggestionComponent, isTrendingSearches, ...rest }) => (
    <div className={theme.suggestionsContainer}>
      <h4 className={cx(theme.typeTitle, theme.suggestionsTitle, {[theme.trendingTitle]: isTrendingSearches})}>{config.getIn(['i18n', isTrendingSearches ? 'trendingSearches'  : 'suggestionsTitle'])}</h4>
      <SearchSuggestions
        className={theme.searchSuggestions}
        widgetKey={config.get('widgetKey')}
        isTrendingSearches={isTrendingSearches}
        {...rest} />
    </div>
  ),
  ProductMatches: ({ config, theme, isTrendingSearches, ...rest}) => (
    <div className={theme.productMatchesContainer}>
      <h4 className={cx(theme.typeTitle, {[theme.trendingTitle]: isTrendingSearches})}>{config.getIn(['i18n', isTrendingSearches ? 'trendingProducts' : 'productMatchesTitle'])}</h4>
      <ProductMatches className={theme.productMatches} config={config} {...rest} />
    </div>
  )
}

const SearchOrZero = ({ suggestions, config, theme, meta, selectedSuggestion, isTrendingSearches, ...rest }) => (
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

export default ({ config, theme, meta, suggestions, innerRef, position, ...rest }) => console.log(position) ||(
  <div display-if={suggestions && suggestions.size > 0} className={theme.wrapper}>
    <div className={theme.overlay} display-if={config.get('showOverlay')}></div>
    <div
      className={theme.root}
      data-findify-autocomplete={true}
      ref={innerRef}
      style={{ [position]: 0 }}>
      <Tip className={theme.tip} title={config.getIn(['i18n', 'tipResults'])} widgetKey={config.get('widgetKey')} />
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
);

