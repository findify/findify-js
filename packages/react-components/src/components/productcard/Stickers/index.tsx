import cx from 'classnames'
import React from 'react'
import Text from 'components/Text'
import Branch from 'components/common/Branch'
import withTheme from 'helpers/withTheme'
import theme from './styles.css'
import { isImmutable } from 'immutable'


export const DiscountSticker = withTheme(theme)(({ className, discount, theme, config }) => (
  <div className={cx(theme.discountSticker, className)}>
    <Text bold>
      <Branch
        condition={isImmutable(discount)}
        left={() => config.getIn(['template', 'multiple']).replace('%s', Math.max.apply(Math, discount.toJS()))}
        right={() => config.getIn(['template', 'single']).replace('%s', discount)} />
    </Text>
  </div>
))
