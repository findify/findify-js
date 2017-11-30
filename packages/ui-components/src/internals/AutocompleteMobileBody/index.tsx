import * as React from 'react';
import * as cx from 'classnames';
import { compose, withState, withHandlers } from 'recompose';
import Icon from 'internals/Icon';

const styles = require('./styles.css');

const Suggestion: any = withHandlers({
  handleClick: ({ suggestion, onClick }) => e => {
    e.preventDefault();
    return onClick(suggestion);
  },
})(({ handleClick, suggestion, query }: any) => (
  <span
    className={styles.suggestionsItem}
    onClick={handleClick}
    dangerouslySetInnerHTML={{
      __html: highlightSuggestion(suggestion.value, query),
    }}
  />
));

export const AutocompleteMobileBody = compose(
  withState('query', 'setQuery', props => props.query),
  withState('inputElement', 'setInputElement', null),
  withHandlers({
    onChange: ({ onInput, setQuery }) => e => {
      if (e) e.preventDefault();
      setQuery(e.target.value);
      return onInput(e.target.value);
    },
    onSubmit: ({ onSubmit, query }) => e => {
      if (e) e.preventDefault();
      return onSubmit(query);
    },
    registerInput: ({ setInputElement }) => r => {
      if (!r) return;
      setInputElement(r);
      return r.focus();
    },
    onSelect: ({ onSubmit }) => suggestion => onSubmit(suggestion),
    onClearClick: ({ onInput, setQuery, inputElement }) => e => {
      if (e) e.preventDefault();
      inputElement.value = '';
      inputElement.focus();
      setQuery('');
      return onInput('');
    },
  })
)(
  ({
    query,
    suggestions,
    onSubmit,
    onClearClick,
    onInput,
    onChange,
    onSelect,
    registerInput,
  }: any) => (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formLeft}>
          <input
            className={styles.input}
            type="text"
            onChange={onChange}
            defaultValue={query}
            ref={registerInput}
          />
          <a className={styles.clear} onClick={onClearClick}>
            <Icon name="close-round" className={styles.icon} />
          </a>
        </div>
        <div className={styles.formRight}>
          <button className={styles.submit} type="submit">
            <Icon name="search" className={styles.icon} />
          </button>
        </div>
      </form>
      <div className={styles.suggestions}>
        {!!suggestions &&
          suggestions.map((suggestion: any) =>
            React.createElement(Suggestion, {
              key: suggestion.value,
              onClick: onSelect,
              suggestion,
              query,
            })
          )}
      </div>
    </div>
  )
);

function highlightSuggestion(value: string, highlighted: string) {
  const regexp = new RegExp(`(${highlighted})`);
  return value.replace(
    regexp,
    `<span class="${styles.highlightedText}">$1</span>`
  );
}

type Props = {
  query: string;
  suggestions: string[];
  onSubmit: (event?: object) => void;
  onInput: (query: string) => void;
  onClearClick: () => void;
  registerInput: any;
  onChange: () => void;
  onSelect: () => void;
};
