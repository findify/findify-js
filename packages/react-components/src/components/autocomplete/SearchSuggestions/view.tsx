/**
 * @module components/autocomplete/SearchSuggestions
 */

import React, { useEffect, useState } from 'react'
import MapArray from 'components/common/MapArray';
import SuggestionItem from 'components/autocomplete/SuggestionItem';
import { ThemedSFCProps, WidgetAwareProps, SuggestionsConnectedProps, ISuggestion, IQuery } from 'types';
import { List } from 'immutable'

/** Props that SearchSuggestionsView accept */
export interface ISearchSuggestionsProps extends ThemedSFCProps, WidgetAwareProps, SuggestionsConnectedProps {
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
}: ISearchSuggestionsProps) => {
  /** ACCESSIBILITY */
  const [announcement, setAnnouncement] = useState('');
  useEffect(() => {
    if (selectedSuggestion === undefined) return;
    rest.config.get('node').setAttribute(
      'aria-activedescendant',
      !!~selectedSuggestion ? suggestions.get(selectedSuggestion).hashCode() : ''
    );
    if (!!~selectedSuggestion) {
      setAnnouncement(suggestions.get(selectedSuggestion).get('value'))
      setTimeout(() => setAnnouncement(''), 1000)
    }
  }, [selectedSuggestion]);
  /** === */

  return (
    <>
      <ul
        display-if={suggestions && query}
        className={theme.list}
        tabIndex={0}
        id="FindifyAutocompleteSuggestions"
        role="listbox"
        aria-label="Search suggestions"
        aria-live="assertive"
      >
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
      <span style={{ display: 'none' }} id="FindifyAutocompleteDescription">
        {
          rest.config.getIn(
            ['a11y', 'autocompleteNote'],
            'Use up and down arrows to review and enter to select.'
          )
        }
      </span>
      <div aria-live="assertive" className={theme.readerText}>
        { announcement }
      </div>
    </>
  )
}


export default SearchSuggestionsView;
