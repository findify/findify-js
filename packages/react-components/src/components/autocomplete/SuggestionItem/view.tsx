/**
 * @module components/autocomplete/SuggestionItem
 */

import React from 'react'
import classnames from 'classnames'
import Icon from 'components/Icon'
import { ISuggestion, ISuggestionProps, IQuery, ThemedSFCProps } from 'types';

/**
 * Function used to return HTML markup for highlighting matching query in SearchSuggestion
 * @param value suggestion value
 * @param highlighted query that is entered in the Autocomplete
 * @param theme theme used by SuggestionItem
 */
function highlightSuggestion(value: string, highlighted: string, theme: Theme) {
  const regexp = new RegExp(`(${highlighted})`, 'i');
  return value.replace(
    regexp,
    `<span class="${theme.highlightedText}">$1</span>`,
  );
}

/**
 * Props that SuggestionItem accepts
 */
export interface ISuggestionItemProps extends ThemedSFCProps, ISuggestionProps {
  /** Suggestion item */
  item?: ISuggestion;
  /** Query, used to highlight matches */
  query: IQuery;
  /** Flag indicating whether current suggestion is in focus over keyboard arrows */
  highlighted: boolean;
  /** Icon name to use */
  icon: string;
  /** Flag indicating that this suggestion is used in TrendingSearches layout of Autocomplete */
  isTrendingSearches: boolean;
  /** Rest of the props that may get passed down */
  [x: string]: any
}

/**
 * Actual view
 */
const SuggestionItemView: React.SFC<ISuggestionItemProps> = ({
    item,
    query,
    theme,
    highlighted,
    onClick,
    icon,
    isTrendingSearches,
    ...rest
}: ISuggestionItemProps) => {
  const value = (item && item.get('value') as string)
  return (
    <li
      display-if={value}
      onClick={onClick}
      className={classnames(theme.suggestion, { [theme.highlighted]: highlighted, [theme.withIcon]: !!icon , [theme.trending]: isTrendingSearches })}>
      <Icon
        display-if={icon}
        name={icon}
        className={theme.icon}
        width={14}
        height={14} />
      <span dangerouslySetInnerHTML={{
      __html: highlightSuggestion(value!, query.get('q') as string, theme)
    }}></span>
    </li>
  )
}

export default SuggestionItemView
