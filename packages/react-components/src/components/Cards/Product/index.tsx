/**
 * @module components/Cards/Product
 */

import cx from 'classnames';
import Image from 'components/common/Picture';
import Rating from 'components/Cards/Product/Rating';
import Price from 'components/Cards/Product/Price';
import Title from 'components/Cards/Product/Title';
import Description from 'components/Cards/Product/Description';
import Variants from 'components/Cards/Product/Variants';
import styles from 'components/Cards/Product/styles.css';

import {
  DiscountSticker,
  OutOfStockSticker,
} from 'components/Cards/Product/Stickers';
import { List } from 'immutable';

import { IProduct, ThemedSFCProps } from 'types';
import { Immutable, Product } from '@findify/store-configuration';
import { memo } from 'react';

export interface IProductCardProps extends ThemedSFCProps {
  item: IProduct;
  config: Immutable.Factory<Product>;
  Container?: React.ElementType;
}

export default memo(
  ({
    item,
    theme = styles,
    className,
    config,
    Container = 'div',
  }: IProductCardProps) => {
    return (
      <Container
        className={cx(theme.root, theme[config.get('template')], className)}
      >
        <div className={theme.content}>
          <Rating
            className={theme.rating}
            value={item.getIn(['reviews', 'average_score'])}
            count={
              item.getIn(['reviews', 'count']) ||
              item.getIn(['reviews', 'total_reviews'])
            }
            display-if={
              config.getIn(['reviews', 'display']) &&
              (!!item.getIn(['reviews', 'count']) ||
                !!item.getIn(['reviews', 'total_reviews']))
            }
          />

          <Variants config={config} item={item} theme={theme} />

          {/*
          Link hack:
          Title's "a" contains :after element with absolute position
          what makes provide link effect to the rest of card
          - To remove element from the effect set `position:relative`
          - Or `z-index: 1`, but it may have side effects
        */}
          <Title
            display-if={config.getIn(['title', 'display'])}
            theme={theme}
            onClick={item.onClick}
            href={item.get('product_url')}
            text={item.get('title')}
          />

          <Description
            display-if={config.getIn(['description', 'display'])}
            theme={theme}
            text={item.get('description')}
          />

          <div className={theme.divider} />

          <Price
            display-if={config.getIn(['price', 'display'])}
            className={theme.priceWrapper}
            item={item}
          />

          <OutOfStockSticker
            display-if={item.getIn(['stickers', 'out-of-stock'])}
            config={config}
          />
        </div>

        {/*
        ADA specific hack:
        We need to make image belong to content, so we move it under the title.
        - flex order set to -1
      */}
        <div className={theme.image} onClick={item.onClick}>
          <Image
            aspectRatio={config.getIn(['product', 'image', 'aspectRatio'])}
            thumbnail={item.get('thumbnail_url')}
            src={item.get('image_url') || item.get('thumbnail_url')}
            alt={item.get('title')}
            lazy={config.getIn(['product', 'image', 'lazy'])}
            offset={config.getIn(['product', 'image', 'lazyOffset'])}
          />
          <DiscountSticker
            config={config}
            className={theme.discountSticker}
            discount={item.get('discount')}
            display-if={
              config.getIn(['stickers', 'discount']) &&
              item.get('discount', List()).size &&
              item.getIn(['stickers', 'discount'])
            }
          />
        </div>
      </Container>
    );
  }
);
