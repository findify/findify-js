/**
 * @module components/Cards/Product/Rating
 */
import 'core-js/features/array/from';
import cx from 'classnames'
import React from 'react'
import Icon from 'components/Icon'
import Text from 'components/Text'
import { ThemedSFCProps } from 'types';

/** Array of empty stars */
const itemsArray = Array.from(Array(5).keys())

/** List of props that Rating component accepts */
export interface IRatingProps extends ThemedSFCProps {
  /** Rating value */
  value: number,
  /** Total reviews */
  count: number,
}

const RatingView: React.SFC<IRatingProps> = ({ value, count, theme }: IRatingProps) => (
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
