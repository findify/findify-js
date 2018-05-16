/**
 * @module components/Cards/Product/Price
 */

import { compose, setDisplayName, withProps } from 'recompose'
import withTheme from 'helpers/withTheme'
import { priceIsSampleArray } from 'helpers/getPrice';
import view from 'components/Cards/Product/Price/view';
import theme from 'components/Cards/Product/Price/styles.css';

export default compose(
  setDisplayName('Price'),
  withTheme(theme),
  withProps(({ discount, oldPrice, price }) => ({
    hasDiscount: (!oldPrice || oldPrice < 0) && (discount && discount.size > 0) && priceIsSampleArray(price),
    hasCompare: oldPrice && oldPrice > 0
  }))
)(view)
