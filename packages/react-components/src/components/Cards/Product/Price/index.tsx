/**
 * @module components/Cards/Product/Price
 */

import cx from 'classnames';
import { getPrice } from 'helpers/getPrice';
import { IProduct, ThemedSFCProps } from 'types';
import { priceIsSampleArray } from 'helpers/getPrice';
import { useConfig } from '@findify/react-connect';
import styles from 'components/Cards/Product/Price/styles.css';

/** List of props that Price component accepts */
export interface IPriceProps extends ThemedSFCProps {
  item: IProduct;
}

export default ({ className, theme = styles, item }: IPriceProps) => {
  const { config } = useConfig();

  const hasDiscount =
    !item.get('compare_at') &&
    item.get('discount') &&
    item.get('discount').size > 0 &&
    priceIsSampleArray(item.get('price'));

  const hasCompare = !!item.get('compare_at');

  return (
    <div className={cx(theme.priceWrapper, className)}>
      <span
        className={cx(
          theme.price,
          (hasDiscount || hasCompare) && theme.salePrice
        )}
      >
        {getPrice(item.get('price'), config.get('currency'))}
      </span>
      <span display-if={hasCompare} className={cx(theme.compare)}>
        {getPrice(item.get('compare_at'), config.get('currency'))}
      </span>
    </div>
  );
};
