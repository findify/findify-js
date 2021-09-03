/**
 * @module components/autocomplete/Suggestions
 */

import cx from 'classnames';
import MapArray from 'components/common/MapArray';
import SuggestionItem from 'components/autocomplete/SuggestionItem';
import { useAnnouncement } from 'components/common/Announcement';
import styles from 'components/autocomplete/Suggestions/styles.css';
import { useQuery, useSuggestions } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';
import Title from 'components/autocomplete/Title';

export default ({
  theme = styles,
  config,
  isTrendingSearches,
  highlightedItem,
  registerItems,
}) => {
  const { suggestions } = useSuggestions<Immutable.AutocompleteConfig>();
  const { query } = useQuery();
  const translate = useTranslations();

  registerItems(suggestions, config.get('limit'));

  return (
    <div className={theme.root} display-if={suggestions.size}>
      <Title>
        {isTrendingSearches
          ? translate('autocomplete.trendingSearches')
          : translate('autocomplete.suggestionsTitle')}
      </Title>
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
          query={query}
          mapProps={(item) => ({
            highlighted:
              highlightedItem && item.hashCode() === highlightedItem.hashCode(),
          })}
        />
      </ul>
      <span style={{ display: 'none' }} id="FindifyAutocompleteDescription">
        {translate('suggestions.accessibleTitle')}
      </span>
    </div>
  );
};
