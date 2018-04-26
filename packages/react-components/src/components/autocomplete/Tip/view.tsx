import React from 'react'
import classnames from 'classnames'

import styles from 'components/autocomplete/Tip/styles.css';

export default ({ suggestions, className, title, theme, getSuggestionProps }) => {
  const suggestionProps = suggestions && suggestions.size > 0 && getSuggestionProps(0) || { onClick: () => {} }
  return (
    <div
      display-if={suggestions && suggestions.size > 0}
      className={classnames(theme.tip, className)}
      onClick={suggestionProps.onClick}
      >
      {title}
      {' '}
      {
        <span className={theme.highlight}>{suggestions.getIn([0, 'value'])}</span>
      }
    </div>
  )
}
