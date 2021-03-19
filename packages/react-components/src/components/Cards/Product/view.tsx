/**
 * @module components/Cards/Product
 */

import React from 'react';
import classNames from 'classnames';
import Image from 'components/common/Picture';
import Rating from 'components/Cards/Product/Rating';
import Price from 'components/Cards/Product/Price';
import Title from 'components/Cards/Product/Title';
import Description from 'components/Cards/Product/Description';
import template from 'helpers/template';
import {
  DiscountSticker,
  OutOfStockSticker,
} from 'components/Cards/Product/Stickers';
import { List } from 'immutable';

import { IProduct, ThemedSFCProps } from 'types';
import {
  Immutable,
  Product,
  Config,
  BaseFeature,
} from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';

export interface IProductCardProps extends ThemedSFCProps {
  item: IProduct;
  config: Immutable.Factory<Config & BaseFeature & Product>;
}

export default ({ item, config, theme }: IProductCardProps) => {
  const t = useTranslations();
  return (
    <a
      onClick={item.onClick}
      href={item.get('product_url')}
      className={classNames(
        theme.root,
        theme.productCard,
        config.get('template') === 'simple' && theme.simple
      )}
    >
      <div className={theme.imageWrap}>
        <Image
          className={theme.image}
          aspectRatio={config.getIn(['image', 'aspectRatio'])}
          thumbnail={item.get('thumbnail_url')}
          src={item.get('image_url') || item.get('thumbnail_url')}
          alt={item.get('title')}
          lazy={config.getIn(['image', 'lazy'])}
          offset={config.getIn(['image', 'lazyOffset'])}
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
      <div
        display-if={
          config.getIn(['reviews', 'display']) &&
          (!!item.getIn(['reviews', 'count']) ||
            !!item.getIn(['reviews', 'total_reviews']))
        }
        className={theme.rating}
      >
        <Rating
          value={item.getIn(['reviews', 'average_score'])}
          count={
            item.getIn(['reviews', 'count']) ||
            item.getIn(['reviews', 'total_reviews'])
          }
        />
      </div>

      {/**
       * @todo Refactor it
       */}
      <div
        className={theme.variants}
        display-if={
          config.getIn(['product', 'variants', 'display']) &&
          item.get('variants', List()).size > 1
        }
      >
        {t('Available in %s variants', item.get('variants', List()).size)}
      </div>
      <div className={theme.content}>
        <Title
          theme={theme}
          display-if={config.getIn(['product', 'title', 'display'])}
          text={item.get('title')}
          config={config.getIn(['product', 'title'])}
        />
        <Description
          theme={theme}
          display-if={config.getIn(['product', 'description', 'display'])}
          text={item.get('description')}
          config={config.getIn(['product', 'description'])}
        />
        <Price
          className={theme.priceWrapper}
          display-if={config.getIn(['product', 'price', 'display'])}
          price={item.get('price')}
          oldPrice={item.get('compare_at')}
          discount={item.get('discount')}
          currency={config.get('currency').toJS()}
        />
        <OutOfStockSticker
          display-if={item.getIn(['stickers', 'out-of-stock'])}
          config={config}
        />
      </div>
    </a>
  );
};
