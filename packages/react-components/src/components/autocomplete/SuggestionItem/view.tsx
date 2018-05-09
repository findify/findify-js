import React from 'react'
import classnames from 'classnames'
import Icon from 'components/Icon'

function highlightSuggestion(value: string, highlighted: string, theme: any) {
  const regexp = new RegExp(`(${highlighted})`, 'i');
  return value.replace(
    regexp,
    `<span class="${theme.highlightedText}">$1</span>`,
  );
}

export default ({ item, query, theme, highlighted, onClick, icon, ...rest }) => {
  const value = item && item.get('value')
  return (
    <li display-if={value} onClick={onClick} className={classnames(theme.suggestion, { [theme.highlighted]: highlighted, [theme.withIcon]: !!icon  })}>
      <Icon
        display-if={icon}
        name={icon}
        className={theme.icon}
        width={14}
        height={14} />
      <span dangerouslySetInnerHTML={{
      __html: highlightSuggestion(value, query.get('q'), theme)
    }}></span>
    </li>
  )
}
