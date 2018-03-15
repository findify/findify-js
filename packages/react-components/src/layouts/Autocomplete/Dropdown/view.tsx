import React from 'react';
import Tip from '../../../components/autocomplete/Tip'
import ProductMatches from '../../../components/autocomplete/ProductMatches'
import SearchSuggestions from '../../../components/autocomplete/SearchSuggestions'

export default ({ config, theme }) => (
  <div className={theme.root}>
    <div className={theme.container}>
      <div className={theme.productMatchesContainer}>
        <h4 className={theme.typeTitle}>{config.getIn(['i18n', 'productMatchesTitle'])}</h4>
        <ProductMatches className={theme.productMatches} />
      </div>
      <div className={theme.suggestionsContainer}>
        <h4 className={theme.typeTitle}>{config.getIn(['i18n', 'suggestionsTitle'])}</h4>
        <SearchSuggestions className={theme.searchSuggestions} />
      </div>
    </div>
    <Tip className={theme.tip} title={config.getIn(['i18n', 'tipTitle'])} />
  </div>
);

