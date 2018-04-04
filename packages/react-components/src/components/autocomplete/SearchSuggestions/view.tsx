import React from 'react'
import MapArray from 'components/common/MapArray';
import SuggestionItem from '../SuggestionItem'

export default ({ theme, suggestions, query, selectedSuggestion, getSuggestionProps, ...rest }) => (
  <div className={theme.list} display-if={suggestions && query}>
    <ul>
      <MapArray
        array={suggestions}
        key={(item, index) => item.hashCode() + index + selectedSuggestion === index}
        factory={
          ({ item, index, key }) => (
            <SuggestionItem
              key={key}
              item={item}
              index={index}
              highlighted={selectedSuggestion === index}
              query={query}
              {...getSuggestionProps(index)} />
          )
        } />
    </ul>
  </div>
)
