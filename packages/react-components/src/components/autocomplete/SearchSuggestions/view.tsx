import React from 'react'
import MapArray from 'components/common/MapArray';
import SuggestionItem from '../SuggestionItem'

export default ({ theme, suggestions, query }) => (
  <div className={theme.list} display-if={suggestions && query}>
    <ul>
      <MapArray
        query={query}
        array={suggestions}
        factory={SuggestionItem} />
    </ul>
  </div>
)
