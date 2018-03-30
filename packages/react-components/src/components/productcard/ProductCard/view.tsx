import React from 'react'
import classNames from 'classnames'
import styles from './styles.css'
import Image from 'components/common/Image'
import Truncate from 'components/common/Truncate'
import Text from 'components/Text'
import Rating from '../Rating'
import Price from '../Price'
import { DiscountSticker } from '../Stickers'
import { Map } from 'immutable'

const Title: any = ({ text, config = Map(), ...rest }) => (
  <Text display-if={!!text} className={styles.title} {...rest}>{text}</Text>
);

const Description: any = ({ text, config = Map(), ...rest }) => (
  <p
    display-if={!!text}
    className={styles.description}
    {...rest}
  >
    <Truncate>{text}</Truncate>
  </p>
);

export default ({
  item,
  product_url,
  imageQuery,
  description,
  title,
  price,
  onClick,
  config,
  theme
}: any) => (
  <a
    onClick={onClick}
    href={item.get('product_url')}
    className={classNames(
      styles.root,
      config.get('simple') && styles.simple
    )}
  >
    <div className={styles.imageWrap}>
      {(item.getIn(['html', 'image']) && (
        <div dangerouslySetInnerHTML={{ __html: item.getIn(['html', 'image']) }} />
      )) || (
        <Image
          className={styles.image}
          aspectRatio={config.getIn(['product', 'image', 'aspectRatio'])}
          thumbnail={item.get('thumbnail_url')}
          src={item.get('image_url') || item.get('thumbnail_url')}
          alt={item.get('title')}
        />
      )}
      <DiscountSticker
        display-if={(item.get('discount') && typeof item.get('discount').size !== 'undefined') ? item.get('discount').size > 0 : item.get('discount')}
        config={config.getIn(['stickers', 'discount'])}
        className={theme.discountSticker}
        discount={item.get('discount')} />
    </div>
    <div display-if={config.getIn(['product', 'reviews', 'display'])} className={styles.rating}>
      {console.log('it', item.get('discount'), item.get('reviews').toJS())}
      <Rating value={item.getIn(['reviews', 'average_score'])} count={item.getIn(['reviews', 'count'])} />
    </div>
    <div className={styles.content}>
      <Title
        display-if={config.getIn(['product', 'title', 'display'])}
        text={item.get('title')}
        config={config.getIn(['product', 'title'])} />
      <Description
        display-if={config.getIn(['product', 'description', 'display'])}
        text={item.get('description')}
        config={config.getIn(['product', 'description'])} />
    </div>
    <Price
      display-if={config.getIn(['product', 'price', 'display'])}
      price={item.get('price')}
      oldPrice={item.get('compare_at')}
      discount={item.get('discount')}
      currency={config.get('currency').toJS()} />
  </a>
);
