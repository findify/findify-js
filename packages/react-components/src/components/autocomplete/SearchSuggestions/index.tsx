/**
 * @module components/autocomplete/SearchSuggestions
 */

import { useEffect } from 'react';
import MapArray from 'components/common/MapArray';
import SuggestionItem from 'components/autocomplete/SuggestionItem';
import { useAnnouncement } from 'components/common/Announcement';
import styles from 'components/autocomplete/SearchSuggestions/styles.css';
import { useQuery, useSuggestions } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';

export default ({ selectedSuggestion, theme = styles }) => {
  const {
    suggestions,
    getSuggestionProps,
    config,
  } = useSuggestions<Immutable.AutocompleteConfig>();
  const { query } = useQuery();
  const t = useTranslations();

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
          factory={({ item, index }) => (
            <SuggestionItem
              tabIndex={0}
              item={item}
              index={index}
              highlighted={selectedSuggestion === index}
              query={query}
              {...getSuggestionProps(index, config.get('widgetKey', ''))}
            />
          )}
        />
      </ul>
      <span style={{ display: 'none' }} id="FindifyAutocompleteDescription">
        {t('Use up and down arrows to review and enter to select.')}
      </span>
      {announcement}
    </>
  );
};
