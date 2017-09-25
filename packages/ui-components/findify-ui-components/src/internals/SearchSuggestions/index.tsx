import * as React from 'react';
import * as cx from 'classnames';
import withHooks from 'helpers/withHooks';

const styles = require('./styles.css');
const customStyles = require('customStyles');

type Props = {
  query: string;
  suggestions: string[];
  selectedSuggestion?: number;
  onSearchSuggestionClick: (query: string) => void;
  title?: string;
  styles: any;
};

export const SearchSuggestions = withHooks(
  'suggestions',
)(
  ({
    title,
    suggestions,
    selectedSuggestion,
    onSearchSuggestionClick,
    query,
  }: Props) => (
    <div className={styles.wrap}>
      {title && (
        <div className={styles.title}>
          <span className={styles.autocompleteTitle}>{title}</span>
        </div>
      )}
      <div className={styles.list}>
        {!!suggestions &&
          suggestions.map((suggestion: any, i: number) => (
            <span
              key={i}
              className={cx(
                styles.item,
                customStyles.autocompleteSuggestion,
                selectedSuggestion === i && styles.selected,
              )}
              onClick={() => onSearchSuggestionClick(suggestion)}
              dangerouslySetInnerHTML={{
                __html: highlightSuggestion(suggestion.value, query),
              }}
            />
          ))}
      </div>
    </div>
  ),
);

function highlightSuggestion(value: string, highlighted: string) {
  const regexp = new RegExp(`(${highlighted})`);
  return value.replace(
    regexp,
    `<span class="${styles.highlightedText}">$1</span>`,
  );
}
