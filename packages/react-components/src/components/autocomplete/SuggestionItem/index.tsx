/**
 * @module components/autocomplete/SuggestionItem
 */
import cx from 'classnames';
import Icon from 'components/Icon';
import { ISuggestion, ISuggestionProps, IQuery, ThemedSFCProps } from 'types';
import escapeRegExp from 'lodash/escapeRegExp';
import styles from 'components/autocomplete/SuggestionItem/styles.css';

/**
 * Function used to return HTML markup for highlighting matching query in SearchSuggestion
 * @param value suggestion value
 * @param highlighted query that is entered in the Autocomplete
 * @param theme theme used by SuggestionItem
 */
function highlightSuggestion(value: string, highlighted: string, theme) {
  const regexp = new RegExp(`(${escapeRegExp(highlighted)})`, 'i');
  return value.replace(
    regexp,
    `<span class="${theme.highlightedText}">$1</span>`
  );
}

/**
 * Props that SuggestionItem accepts
 */
export interface ISuggestionItemProps extends ThemedSFCProps, ISuggestionProps {
  /** Suggestion item */
  item: ISuggestion;
  /** Query, used to highlight matches */
  query: IQuery;
  /** Flag indicating whether current suggestion is in focus over keyboard arrows */
  highlighted: boolean;
  /** Icon name to use */
  icon: string;
  /** Flag indicating that this suggestion is used in TrendingSearches layout of Autocomplete */
  isTrendingSearches: boolean;
  /** Rest of the props that may get passed down */
  [x: string]: any;
}

export default ({
  item,
  query,
  theme = styles,
  highlighted,
  onClick,
  icon,
  isTrendingSearches,
}: ISuggestionItemProps) => {
  const value = item && (item.get('value') as string);
  return (
    <li
      display-if={value}
      onClick={onClick}
      role="option"
      id={`suggestion-${Math.abs(item.hashCode())}`}
      aria-selected={highlighted}
      className={cx(theme.suggestion, {
        [theme.highlighted]: highlighted,
        [theme.withIcon]: !!icon,
        [theme.trending]: isTrendingSearches,
      })}
    >
      <Icon
        display-if={icon}
        name={icon}
        className={theme.icon}
        width={14}
        height={14}
      />
      <span
        dangerouslySetInnerHTML={{
          __html: highlightSuggestion(value, query.get('q') as string, theme),
        }}
      />
    </li>
  );
};
