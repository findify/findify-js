import React from 'react'
import classnames from 'classnames'

function highlightSuggestion(value: string, highlighted: string, theme: any) {
  const regexp = new RegExp(`(${highlighted})`);
  return value.replace(
    regexp,
    `<span class="${theme.highlightedText}">$1</span>`,
  );
}

export default ({ item, query, theme, highlighted, onClick, ...rest }) => {
  const value = item && item.get('value')
  return (
    <li display-if={value} onClick={onClick} className={classnames(theme.suggestion, { [theme.highlighted]: highlighted })} dangerouslySetInnerHTML={{
      __html: highlightSuggestion(value, query.get('q'), theme)
    }} />
  )
}
