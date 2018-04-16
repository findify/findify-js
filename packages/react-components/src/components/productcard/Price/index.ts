import { compose, setDisplayName, withProps } from 'recompose'
import withTheme from 'helpers/withTheme'
import { priceIsSampleArray } from 'helpers/getPrice';
import view from 'components/productcard/Price/view';
import theme from 'components/productcard/Price/styles.css';

export default compose(
  setDisplayName('Price'),
  withTheme(theme),
  withProps(({ discount, oldPrice, price }) => ({
    hasDiscount: (!oldPrice || oldPrice < 0) && (discount && discount.size > 0) && priceIsSampleArray(price),
    hasCompare: oldPrice && oldPrice > 0
  }))
)(view)
