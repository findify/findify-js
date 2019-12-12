/**
 * @module components/Cards/Product/Stickers
 */

import cx from 'classnames'
import React from 'react'
import Text from 'components/Text'
import Branch from 'components/common/Branch'
import withTheme from 'helpers/withTheme'
import theme from 'components/Cards/Product/Stickers/styles.css';
import { isImmutable, fromJS } from 'immutable'

const defaultDiscountConfig = fromJS({
  "position": "top-right",
  "template": {
    "single": "%s% OFF",
    "multiple": "Up to %s% off"
  },
  "styles": {
    "background": "#c483b3",
    "color": "#ffffff",
    "fontFamily": "'Helvetica Neue', Helvetica, Arial, sans-serif;",
    "fontSize": "14px",
    "fontWeight": "700"
  }
});
const formatStyle = (key, value) => {
  if (key === 'fontFamily') return value.replace(';', '');
  return isNaN(Number(value)) ? value : Number(value);
}

const format = (obj) => Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: formatStyle(key, obj[key]) }), {})

const getPositionStyle = (position) => {
  if (!position) return;
  const [vertical, horizontal] = position.split('-');
  return {
    top: 'auto',
    right: 'auto',
    [vertical === 'center' ? 'top' : vertical]: vertical === 'center' ? '50%' : '4%',
    [horizontal === 'center' ? 'left' : horizontal]: horizontal === 'center' ? '50%' : '4%',
    transform: `translate(${horizontal === 'center' ? '-50%' : '0'}, ${vertical === 'center' ? '-50%' : '0'})`
  }
}
const defaultOutOfStockConfig = fromJS({
  "template": {
    "single": "Out of stock"
  },
});



export const DiscountSticker = withTheme(theme)(({ className, discount, theme, config }) => {
  let realConfig = config.get('stickers')
  if (!realConfig || !realConfig.get('discount')) realConfig = defaultDiscountConfig
  else realConfig = realConfig.get('discount');
  const style = realConfig.get('styles') && format(realConfig.get('styles').toJS());
  const position = getPositionStyle(realConfig.get('position'));
  return (
    <div className={cx(theme.discountSticker, className)} style={{ ...style, ...position }}>
      <Text bold style={{ color: style && style.color }}>
        <Branch
          condition={discount.size > 1}
          left={() => realConfig.getIn(['template', 'multiple']).replace('%s', Math.max.apply(Math, discount.toJS()))}
          right={() => (realConfig.getIn(['template', 'single']) || realConfig.get('template')).replace('%s', Math.max.apply(Math, discount.toJS()))} />
      </Text>
    </div>
  )
})

export const OutOfStockSticker = withTheme(theme)(({ className, theme, config }) => {
  const realConfig = config.getIn(['stickers', 'out-of-stock'], defaultOutOfStockConfig)
  return (
    <div className={cx(theme.outOfStockSticker, className)}>
      <Text>
        {
          realConfig.getIn(['template', 'single']) || realConfig.get('template')
        }
      </Text>
    </div>
  )
})
