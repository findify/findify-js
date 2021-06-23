/**
 * @module components/autocomplete/Suggestions
 */

import { useCallback, useEffect } from 'react';
import cx from 'classnames';
import MapArray from 'components/common/MapArray';
import SuggestionItem from 'components/autocomplete/SuggestionItem';
import { useAnnouncement } from 'components/common/Announcement';
import styles from 'components/autocomplete/Suggestions/styles.css';
import { useQuery, useSuggestions } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';

export default ({
  selectedSuggestion = undefined,
  theme = styles,
  config,
  isTrendingSearches,
}) => {
  const {
    suggestions,
    getSuggestionProps,
  } = useSuggestions<Immutable.AutocompleteConfig>();
  const { query } = useQuery();
  const translate = useTranslations();

  const suggestionProps = useCallback(
    (item, index) => getSuggestionProps(index, config.get('widgetKey', '')),
    [getSuggestionProps]
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
    <div className={theme.root} display-if={suggestions.size}>
      <h4 className={theme.title}>
        {isTrendingSearches
          ? translate('autocomplete.trendingSearches')
          : translate('autocomplete.suggestionsTitle')}
      </h4>
      <ul
        display-if={suggestions && query}
        className={cx(theme.list, theme[config.get('template')])}
        tabIndex={0}
        id="FindifyAutocompleteSuggestions"
        role="listbox"
        aria-label="Search suggestions"
        aria-live="assertive"
      >
        <MapArray
          array={suggestions}
          factory={SuggestionItem}
          limit={config.get('limit')}
          tabIndex={0}
          template={config.get('template')}
          icon={isTrendingSearches && 'Fire'}
          isTrendingSearches={isTrendingSearches}
          selectedSuggestion={selectedSuggestion}
          query={query}
          mapProps={suggestionProps}
        />
      </ul>
      <span style={{ display: 'none' }} id="FindifyAutocompleteDescription">
        {translate('suggestions.accessibleTitle')}
      </span>
      {announcement}
    </div>
  );
};
