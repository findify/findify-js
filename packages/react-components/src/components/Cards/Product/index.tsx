/**
 * @module components/Cards/Product
 */

import cx from 'classnames';
import Image from 'components/common/Image';
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
import trackProductPosition from 'helpers/trackProductPosition';
import { useMemo, useState } from 'react';

export interface IProductCardProps extends ThemedSFCProps {
  item: IProduct;
  config: Immutable.Factory<Product>;
  Container?: React.ElementType;
  highlighted: boolean;
}

const useVariants = (
  item
): [IProduct, React.Dispatch<React.SetStateAction<string>>] => {
  const [currentVariant, setVariant] = useState<string>(
    item.get('selected_variant_id')
  );
  const variant = useMemo(
    () =>
      item.merge(
        item.get('variants')?.find((i) => i.get('id') === currentVariant)
      ),
    [currentVariant]
  );
  return [variant, setVariant];
};
export default ({
  item,
  theme = styles,
  className,
  config,
  Container = 'div',
  highlighted,
}: IProductCardProps) => {
  const container = trackProductPosition(item);
  const [variant, setVariant] = useVariants(item);

  return (
    <Container
      ref={container}
      data-element="card"
      className={cx(
        theme.root,
        theme[config.get('template')],
        highlighted && theme.highlighted,
        className
      )}
    >
      <div className={theme.content}>
        <Rating
          className={theme.rating}
          value={variant.getIn(['reviews', 'average_score'])}
          count={
            variant.getIn(['reviews', 'count']) ||
            variant.getIn(['reviews', 'total_reviews'])
          }
          display-if={
            !!variant.getIn(['reviews', 'count']) ||
            !!variant.getIn(['reviews', 'total_reviews'])
          }
        />

        <Variants config={config} item={item} />

        {/*
        Link hack:
        Title's "a" contains :after element with absolute position
        what makes provide link effect to the rest of card
        - To remove element from the effect set `position:relative`
        - Or `z-index: 1`, but it may have side effects
      */}
        <Title
          display-if={!!variant.get('title')}
          theme={theme}
          onClick={variant.onClick}
          href={variant.get('product_url')}
          text={variant.get('title')}
        />

        <Description
          display-if={!!variant.get('description')}
          theme={theme}
          text={variant.get('description')}
        />

        <div className={theme.divider} />

        <Price
          display-if={!!variant.get('price')}
          className={theme.priceWrapper}
          item={item}
        />

        <OutOfStockSticker
          display-if={variant.getIn(['stickers', 'out-of-stock'])}
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
          aspectRatio={config.getIn(['image', 'aspectRatio'])}
          thumbnail={variant.get('thumbnail_url')}
          alt={variant.get('title')}
          lazy={config.getIn(['image', 'lazy'])}
          offset={config.getIn(['image', 'lazyOffset'])}
          src={
            config.getIn(['image', 'multiple'])
              ? [variant.get('image_url'), variant.get('image_2_url')]
              : variant.get('image_url') || variant.get('thumbnail_url')
          }
        />
        <DiscountSticker
          config={config}
          className={theme.discountSticker}
          discount={variant.get('discount')}
          display-if={
            config.getIn(['stickers', 'discount']) &&
            variant.get('discount', List()).size &&
            variant.getIn(['stickers', 'discount'])
          }
        />
      </div>
    </Container>
  );
};
