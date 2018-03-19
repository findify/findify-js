import React from 'react'

function highlightSuggestion(value: string, highlighted: string, theme: any) {
  const regexp = new RegExp(`(${highlighted})`);
  return value.replace(
    regexp,
    `<span class="${theme.highlightedText}">$1</span>`,
  );
}

export default ({ item, key, query, theme }) => {
  const value = item && item.get('value')
  return (
    <li display-if={value} key={key} className={theme.suggestion} dangerouslySetInnerHTML={{
      __html: highlightSuggestion(value, query.get('q'), theme)
    }} />
  )
}
