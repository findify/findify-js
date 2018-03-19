import React from 'react'
import classnames from 'classnames'

import styles from './styles.css'

export default ({ query, className, title, theme }) => (
  <div className={classnames(theme.tip, className)}>
    {title}
    {' '}
    {
      query && query.get('q') && query.get('q').length > 0
      ? <span className={theme.highlight}>{query.get('q')}</span>
      : ''
    }
  </div>
)
