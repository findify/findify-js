import React from 'react'
import classNames from 'classnames'
import styles from './styles.css'
import Image from '../../internal/Image'
import Truncate from '../../internal/Truncate'

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
  product_url,
  image_url,
  imageQuery,
  description,
  thumbnail_url,
  title,
  price,
  onClick,
  config,
  html = {},
}: any) => (
  <a
    onClick={onClick}
    href={product_url}
    className={classNames(
      styles.root,
      config.simple && styles.simple
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
    </div>
    <div className={styles.content}>
      <Title text={title} config={config.title} />
      <Description text={description} config={config.description} />
    </div>
    {config.price.display && (
      <span className={styles.price}>{price}</span>
    )}
  </a>
);
