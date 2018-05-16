/**
 * @module components/autocomplete/SearchSuggestions
 */

import React from 'react'
import MapArray from 'components/common/MapArray';
import SuggestionItem from 'components/autocomplete/SuggestionItem';
import { ThemedSFCProps, WidgetAwareProps, SuggestionsConnectedProps, ISuggestion, IQuery } from 'types/index';
import { List } from 'immutable'

/** Props that SearchSuggestionsView accept */
interface ISearchSuggestionsProps extends ThemedSFCProps, WidgetAwareProps, SuggestionsConnectedProps {
  /** Query currently entered in the autocomplete */
  query: IQuery;
  /** Any other props that come through here to SuggestionItem */
  [x: string]: any
}

/**
 * Actual view
 */
const SearchSuggestionsView: React.SFC<ISearchSuggestionsProps> = ({
  theme,
  suggestions,
  query,
  selectedSuggestion,
  widgetKey,
  getSuggestionProps,
  ...rest
}: ISearchSuggestionsProps) => (
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


export default SearchSuggestionsView;
