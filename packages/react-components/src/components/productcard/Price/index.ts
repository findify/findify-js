import { compose, setDisplayName, withProps } from 'recompose'
import withTheme from 'helpers/withTheme'
import { priceIsSampleArray } from 'helpers/getPrice';
import theme from './styles.css'
import view from './view'

export default compose(
  setDisplayName('Price'),
  withTheme(theme),
  withProps(({ discount, oldPrice, price }) => ({
    hasDiscount: (!oldPrice || oldPrice < 0) && (discount.size > 0) && priceIsSampleArray(price),
    hasCompare: oldPrice && oldPrice > 0
  }))
)(view)
