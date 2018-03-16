import React from 'react'
import classNames from 'classnames'
import styles from './styles.css'
import Image from '../../common/Image'
import Truncate from '../../common/Truncate'

const Title: any = ({ text, config, ...rest }) =>
  config.display &&
  !!text && (
    <h5 className={styles.title} {...rest}>
      {text}
    </h5>
  );

const Description: any = ({ text, config, ...rest }) =>
  config.display &&
  !!text && (
    <p
      className={styles.description}
      {...rest}
    >
      <Truncate lines={config.lines}>{text}</Truncate>
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
      {(item.get('html.image') && (
        <div dangerouslySetInnerHTML={{ __html: item.get('html.image') }} />
      )) || (
        <Image
          className={styles.image}
          src={item.get('image_url') || item.get('thumbnail_url')}
          alt={item.get('title')}
        />
      )}
    </div>
    <div className={styles.content}>
      <Title text={item.get('title')} config={config.get('productcard.title')} />
      <Description text={item.get('description')} config={config.get('productcard.description')} />
    </div>
    {config.get('productcard.price.display') && (
      <span className={styles.price}>{item.get('price')}</span>
    )}
  </a>
);
