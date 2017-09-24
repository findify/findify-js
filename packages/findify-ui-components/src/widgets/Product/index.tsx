import * as React from 'react';
import {
  compose,
  defaultProps,
  mapProps,
  pure,
  setDisplayName,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose';
import { format as currencyFormat } from 'currency-formatter';
import * as cx from 'classnames';
import { isEmpty } from 'lodash';

import Truncate from 'internals/Truncate';
import { Rating } from 'widgets/Rating';
import Image from 'internals/Image';
import { Stickers } from 'internals/Stickers';
import { getPrice, priceIsSampleArray } from 'helpers/getPrice';
import withConfig from 'helpers/withConfig';
import withHooks from 'helpers/withHooks';
import template from 'helpers/template';

const styles = require('./styles.css');
const customStyles = require('customStyles');

const Title: any = ({ text, config, ...rest }) =>
  config.display &&
  !!text && (
    <h5 className={cx(styles.title, customStyles.productTitle)} {...rest}>
      <Truncate lines={config.lines}>{text}</Truncate>
    </h5>
  );

const Description: any = ({ text, config, ...rest }) =>
  config.display &&
  !!text && (
    <p
      className={cx(styles.description, customStyles.productDescription)}
      {...rest}
    >
      <Truncate lines={config.lines}>{text}</Truncate>
    </p>
  );

const Price: any = withProps(({ discount, oldPrice, price }) => ({
  hasDiscount:
    (!oldPrice || oldPrice < 0) &&
    !isEmpty(discount) &&
    priceIsSampleArray(price),
  hasCompare: oldPrice && oldPrice > 0,
}))(
  ({ price, oldPrice, currency, hasDiscount, hasCompare, config }: any) =>
    price && (
      <div className={cx(styles.priceWrap, customStyles.productPrice)}>
        <span
          className={cx(
            styles.price,
            customStyles.productPriceRegular,
            (hasDiscount || hasCompare) && customStyles.productPriceSale,
          )}
        >
          {getPrice(price, currency)}
        </span>
        {hasCompare && (
          <span className={cx(styles.compare)}>
            {currencyFormat(oldPrice, currency)}
          </span>
        )}
      </div>
    ),
);

export const HOC = compose(
  setDisplayName('Product'),
  pure,
  withConfig({
    currency: {
      code: 'USD',
    },
    title: {
      lines: 3,
      display: true,
    },
    description: {
      lines: 3,
      display: true,
    },
    price: {
      display: true,
    },
    reviews: {
      display: true,
    },
    stickers: {
      'out-of-stock': {
        template: 'Temporary out of stock',
      },
    },
    i18n: {
      colorsAvailable: 'Colors available',
      discount: '(%s% discount)',
    },
  }),
  withHandlers({
    onClick: ({ onProductClick, ...rest }) => e => {
      if (onProductClick) {
        if (e && e.isDefaultPrevented && e.isDefaultPrevented()) return;
        e.preventDefault();
        return onProductClick(rest);
      }
    },
  }),
  withHooks('product'), // Deprecated hook
  withHooks('item'),
);

export const Component = ({
  product_url,
  image_url,
  imageQuery,
  description,
  thumbnail_url,
  title,
  reviews,
  price,
  compare_at,
  discount,
  color_variants,
  onClick,
  config,
  stickers,
  html = {},
}: any) => (
  <a
    onClick={onClick}
    href={product_url}
    className={cx(
      styles.root,
      customStyles.product,
      config.simple && styles.simple,
    )}
  >
    <div className={styles.imageWrap}>
      {(html.image && (
        <div dangerouslySetInnerHTML={{ __html: html.image }} />
      )) || (
          <Image
            className={styles.image}
            src={image_url || thumbnail_url}
            alt={title}
          />
        )}
      <Stickers config={config.stickers} stickers={stickers} />
    </div>
    <div className={styles.content}>
      <Title text={title} config={config.title} />
      <Description text={description} config={config.description} />
    </div>
    {!!color_variants &&
      color_variants > 1 && (
        <p className={styles.color}>
          {color_variants} {config.i18n.colorsAvailable}
        </p>
      )}
    {config.reviews.display &&
      reviews &&
      !!reviews.average_score && (
        <div className={styles.rating}>
          <Rating count={reviews.total_reviews} value={reviews.average_score} />
        </div>
      )}
    {config.price.display && (
      <Price
        price={price}
        oldPrice={compare_at}
        currency={config.currency}
        config={config}
        discount={discount}
      />
    )}
    {stickers['out-of-stock'] && (
      <p className={styles.outOfStock}>
        {config.stickers['out-of-stock'].template}
      </p>
    )}
  </a>
);

export const Product: any = HOC(Component);
