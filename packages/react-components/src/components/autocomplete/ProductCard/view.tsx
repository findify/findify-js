import React from 'react'
import classNames from 'classnames'
import styles from './styles.css'
import Image from '../../common/Image'
import Truncate from '../../common/Truncate'
import { Map } from 'immutable'

const Title: any = ({ text, config = Map(), ...rest }) => (
  <h5 display-if={!!text} className={styles.title} {...rest}>
    {text}
  </h5>
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
          src={item.get('image_url') || item.get('thumbnail_url')}
          alt={item.get('title')}
        />
      )}
    </div>
    <div className={styles.content}>
      <Title
        display-if={config.getIn(['productcard', 'title', 'display'])}
        text={item.get('title')}
        config={config.getIn(['productcard', 'title'])} />
      <Description
        display-if={config.getIn(['productcard', 'description', 'display'])}
        text={item.get('description')}
        config={config.getIn('productcard', 'description')} />
    </div>
    {config.getIn(['productcard', 'price', 'display']) && (
      <span className={styles.price}>{item.get('price')}</span>
    )}
  </a>
);
