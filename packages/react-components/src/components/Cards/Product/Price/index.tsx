/**
 * @module components/Cards/Product/Price
 */

import cx from 'classnames';
import { getPrice } from 'helpers/getPrice';
import { IProduct, ThemedSFCProps } from 'types';
import { priceIsSampleArray } from 'helpers/getPrice';
import { useConfig } from '@findify/react-connect';
import { useMemo } from 'react';
import useTheme from 'helpers/useTheme';
import styles from 'components/Cards/Product/Price/styles.css';

/** List of props that Price component accepts */
export interface IPriceProps extends ThemedSFCProps {
  item: IProduct;
}

export default ({ className, theme: _theme, item }: IPriceProps) => {
  const { config } = useConfig();
  const theme = useTheme(_theme, styles);
  const [hasDiscount, hasCompare] = useMemo(
    () => [
      (!item.get('oldPrice') || item.get('oldPrice').size < 0) &&
        item.get('discount') &&
        item.get('discount').size > 0 &&
        priceIsSampleArray(item.get('price')),
      item.get('oldPrice') && item.get('oldPrice').size > 0,
    ],
    []
  );

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
        {getPrice(item.get('oldPrice'), config.get('currency'))}
      </span>
    </div>
  );
};
