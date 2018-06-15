/**
 * @module components/contentsearch/ContentCard
 */
import React from 'react';
import { compose, setDisplayName } from 'recompose'
import withTheme from 'helpers/withTheme'
import styles from 'components/contentsearch/ContentCard/styles.css'
import view from 'components/contentsearch/ContentCard/view'

export default compose(
  setDisplayName('ContentCard'),
  withTheme(styles)
)(view)
