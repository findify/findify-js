import React from 'react'
import MapArray from 'components/common/MapArray';
import SuggestionItem from 'components/autocomplete/SuggestionItem';

export default ({ theme, suggestions, query, selectedSuggestion, widgetKey, getSuggestionProps, ...rest }) => (
  <ul className={theme.list} display-if={suggestions && query}>
    <MapArray
      array={suggestions}
      factory={({ item, index }) =>
        <SuggestionItem
          item={item}
          index={index}
          highlighted={selectedSuggestion === index}
          query={query}
          {...getSuggestionProps(index, widgetKey || '')}
          {...rest}
        />
      } />
  </ul>
)
