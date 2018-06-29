/**
 * @module components/Cards/Product
 */

import React from 'react'
import classNames from 'classnames'
import Image from 'components/common/Image'
import Truncate from 'components/common/Truncate'
import Text from 'components/Text'
import Rating from 'components/Cards/Product/Rating';
import Price from 'components/Cards/Product/Price';
import template from 'helpers/template';
import { DiscountSticker, OutOfStockSticker  } from 'components/Cards/Product/Stickers';
import { Map, List } from 'immutable'
import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types';

const Title: any = ({ text, theme, ...rest }) => (
  <Text display-if={!!text} className={theme.title} {...rest}>{text}</Text>
);

const Description: any = ({ text, theme, ...rest }) => (
  <p
    display-if={!!text}
    className={theme.description}
    {...rest}
  >
    <Truncate>{text}</Truncate>
  </p>
);

export interface IProductCardProps extends ThemedSFCProps {
  item: IProduct;
  config: MJSConfiguration;
}

const ProductCardView: React.SFC<IProductCardProps> = ({
  item,
  config,
  theme,
}: any) => (
  <a
    onClick={item.onClick}
    href={item.get('product_url')}
    className={classNames(
      theme.root,
      config.get('simple') && theme.simple,
      theme.productCard,
    )}
  >
    <div className={classNames(theme.imageWrap)}>
      <Image
        className={classNames(theme.image)}
        aspectRatio={config.getIn(['product', 'image', 'aspectRatio'], 1)}
        thumbnail={item.get('thumbnail_url')}
        src={item.get('image_url') || item.get('thumbnail_url')}
        alt={item.get('title')}
      />
      <div display-if={config.getIn(['product', 'stickers', 'display'])}>
        <DiscountSticker
          config={config}
          className={theme.discountSticker}
          discount={item.get('discount')}
          display-if={
            ((item.get('discount') && typeof item.get('discount').size !== 'undefined')
            ? item.get('discount').size > 0
            : item.get('discount')) && item.getIn(['stickers', 'discount'])
          } />
      </div>
    </div>
    <div display-if={config.getIn(['product', 'reviews', 'display']) && !!item.getIn(['reviews', 'count'])} className={theme.rating}>
      <Rating value={item.getIn(['reviews', 'average_score'])} count={item.getIn(['reviews', 'count'])} />
    </div>
    <div
      className={theme.variants}
      display-if={
        config.getIn(['product', 'variants', 'display']) &&
        item.get('variants', List()).size > 1
      }
      >
      {
        template(config.getIn(['product', 'i18n', 'variants'], 'Available in %s variants'))(
          item.get('variants', List()).size
        )
      }
    </div>
    <div className={theme.content}>
      <Title
        theme={theme}
        display-if={config.getIn(['product', 'title', 'display'])}
        text={item.get('title')}
        config={config.getIn(['product', 'title'])} />
      <Description
        theme={theme}
        display-if={config.getIn(['product', 'description', 'display'])}
        text={item.get('description')}
        config={config.getIn(['product', 'description'])} />
      <Price
        className={theme.priceWrapper}
        display-if={config.getIn(['product', 'price', 'display'])}
        price={item.get('price')}
        oldPrice={item.get('compare_at')}
        discount={item.get('discount')}
        currency={config.get('currency').toJS()} />
      <OutOfStockSticker
        display-if={item.getIn(['stickers', 'out-of-stock'])}
        config={config} />
    </div>
  </a>
)

export default ProductCardView;
