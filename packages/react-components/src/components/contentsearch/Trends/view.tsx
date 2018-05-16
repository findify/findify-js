/**
 * @module components/contentsearch/Trends
 */

import React from 'react'
import Text from 'components/Text'

export default ({ theme, config, text }) => (
  <div className={theme.root}>
    <Text className={theme.topTrendsTitle} primary bold uppercase inlineBlock>
      {config.getIn(['i18n', 'topTrendsTitle'], 'Showing top trends for')}
    </Text>
    <Text primary inlineBlock html={text} />
  </div>
)
