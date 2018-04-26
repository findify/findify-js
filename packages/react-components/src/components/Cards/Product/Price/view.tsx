import cx from 'classnames'
import React from 'react'
import { List } from 'immutable'
import Text from 'components/Text'
import { getPrice } from 'helpers/getPrice'


const PriceView: ThemedSFC<{
  price: List<number>,
  oldPrice?: number,
  currency: string,
  discount: List<number>,
  hasDiscount: boolean,
  hasCompare: boolean,
}> = ({ className, price, theme, currency, hasDiscount, hasCompare, oldPrice }) => (
  <div className={cx(theme.priceWrapper, className)}>
    <span className={cx(
      theme.price,
      (hasDiscount || hasCompare) && theme.salePrice
    )}>
      {getPrice(price, currency)}
    </span>
    <span display-if={hasCompare} className={cx(theme.compare)}>
      {getPrice(oldPrice, currency)}
    </span>
  </div>
)

export default PriceView
