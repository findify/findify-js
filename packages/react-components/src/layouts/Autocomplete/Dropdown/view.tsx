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
  SearchSuggestions: ({ config, theme, ...rest }) => (
    <div className={theme.suggestionsContainer}>
      <h4 className={cx(theme.typeTitle, theme.suggestionsTitle)}>{config.getIn(['i18n', 'suggestionsTitle'])}</h4>
      <SearchSuggestions className={theme.searchSuggestions} widgetKey={config.get('widgetKey')} {...rest} />
    </div>
  ),
  ProductMatches: ({ config, theme, showModal, ...rest}) => (
    <div className={theme.productMatchesContainer}>
      <h4 className={theme.typeTitle}>{config.getIn(['i18n', 'productMatchesTitle'])}</h4>
      <ProductMatches className={theme.productMatches} config={config} {...rest} />
    </div>
  )
}

const NotFoundView = ({ theme }) => (
  <h4 className={theme.notFound}>Nothing found... Maybe these items will interest you?</h4>
)

const StartTypingView = ({ theme }) => (
  <h4 className={theme.startTyping}>What are you looking for?</h4>
)

const SearchOrZero = ({ suggestions, config, theme, meta, selectedSuggestion, ...rest }) => (
  <Branch
    condition={suggestions && suggestions.size > 0}
    left={() => (
      <MapArray
        array={config.get('viewOrder', ["SearchSuggestions", "ProductMatches"])}
        keyAccessor={item => console.log('Using key', item) || item}
        factory={({ item }: ({ item: 'SearchSuggestions' | 'ProductMatches' })) =>
          React.createElement(LayoutColumns[item], { config, theme, meta, ...(item === 'SearchSuggestions' ? {selectedSuggestion} : {}), ...rest })
        } />
    )}
    right={() => (
      <Branch
        condition={meta && meta.get('q') && meta.get('q') !== ''}
        left={() => <NotFoundView theme={theme} />}
        right={() => <StartTypingView theme={theme} />} />
    )} />
)

export default ({ config, theme, meta, suggestions, ...rest }) => (
  <React.Fragment display-if={suggestions && suggestions.size > 0 && meta && meta.get('q') && meta.get('q') !== ''}>
    <div className={theme.overlay} display-if={config.get('showOverlay')}></div>
    <div className={theme.root} data-findify-autocomplete={true}>
      <Tip className={theme.tip} title={config.getIn(['i18n', 'tipTitle'])} widgetKey={config.get('widgetKey')} />
      <div className={theme.container}>
        <SearchOrZero theme={theme} meta={meta} config={config} suggestions={suggestions} {...rest} />
      </div>
    </div>
  </React.Fragment>
);

