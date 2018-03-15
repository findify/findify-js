import React from 'react'
import classnames from 'classnames'

import styles from './styles.css'

export default ({ query, className, title }) => (
  <div className={classnames(styles.root, className)}>
    {title}
    {' '}
    {
      query.length > 0
      ? <span className={styles.highlight}>{query}</span>
      : ''
    }
  </div>
)
