import React from 'react'
import MapArray from 'components/common/MapArray';
import SuggestionItem from '../SuggestionItem'

const suggestionFactory = React.createFactory(SuggestionItem)

export default ({ theme, suggestions, query }) => (
  <div className={theme.list} display-if={suggestions && query}>
    <ul>
      <MapArray
        array={suggestions}
        factory={(props) => suggestionFactory({ query, ...props })} />
    </ul>
  </div>
)
