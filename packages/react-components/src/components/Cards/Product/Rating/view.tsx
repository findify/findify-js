import cx from 'classnames'
import React from 'react'
import Icon from 'components/Icon'
import Text from 'components/Text'

const itemsArray = Array.from(Array(5).keys())

const RatingView: ThemedSFC<
  {
    value: number,
    count: number,
  }> = ({ value, count, theme }) => (
  <div className={theme.rating}>
    <div className={theme.stars}>
      {itemsArray.map((index:number) => (
        <Icon key={index} name='Star' className={cx(theme.star, { [theme.filled]: index < value })} />
      ))}
    </div>
    <Text display-if={!!count} className={theme.count} mode='secondary-uppercase'>({count})</Text>
  </div>
)


export default RatingView;
