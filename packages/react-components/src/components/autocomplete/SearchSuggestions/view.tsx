import React from 'react'
import MapArray from 'components/common/MapArray';
import SuggestionItem from 'components/autocomplete/SuggestionItem';

export default ({ theme, suggestions, query, selectedSuggestion, widgetKey, getSuggestionProps, ...rest }) => (
  <div className={theme.list} display-if={suggestions && query}>
    <ul>
      <MapArray
        array={suggestions}
        key={(item, index) => item.hashCode() + index + selectedSuggestion === index}
        factory={
          ({ item, index, key }) => (
            <SuggestionItem
              item={item}
              index={index}
              highlighted={selectedSuggestion === index}
              query={query}
              {...getSuggestionProps(index, widgetKey || '')} />
          )
        } />
    </ul>
  </div>
)
