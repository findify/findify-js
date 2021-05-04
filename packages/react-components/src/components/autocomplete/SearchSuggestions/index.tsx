/**
 * @module components/autocomplete/SearchSuggestions
 */

import { useCallback, useEffect } from 'react';
import MapArray from 'components/common/MapArray';
import SuggestionItem from 'components/autocomplete/SuggestionItem';
import { useAnnouncement } from 'components/common/Announcement';
import styles from 'components/autocomplete/SearchSuggestions/styles.css';
import { useQuery, useSuggestions } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';

export default ({ selectedSuggestion = undefined, theme = styles }) => {
  const {
    suggestions,
    getSuggestionProps,
    config,
  } = useSuggestions<Immutable.AutocompleteConfig>();
  const { query } = useQuery();
  const translate = useTranslations();

  const suggestionProps = useCallback(
    (item, index) => getSuggestionProps(index, config.get('widgetKey', '')),
    []
  );

  /** ACCESSIBILITY */
  const [announcement, setAnnouncement] = useAnnouncement();
  useEffect(() => {
    if (selectedSuggestion === undefined) return;
    config
      .get('node')
      .setAttribute(
        'aria-activedescendant',
        ~selectedSuggestion
          ? suggestions.get(selectedSuggestion).hashCode()
          : ''
      );
    if (~selectedSuggestion) {
      setAnnouncement(suggestions.get(selectedSuggestion).get('value'));
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
          factory={SuggestionItem}
          tabIndex={0}
          selectedSuggestion={selectedSuggestion}
          query={query}
          mapProps={suggestionProps}
        />
      </ul>
      <span style={{ display: 'none' }} id="FindifyAutocompleteDescription">
        {translate('suggestions.accessibleTitle')}
      </span>
      {announcement}
    </>
  );
};
