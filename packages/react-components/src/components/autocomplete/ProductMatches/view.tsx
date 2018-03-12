import React from 'react'
import styles from './styles.css'
import ProductCard from '../ProductCard'
import Grid from '../../internal/Grid'

// TODO: use MapArray for it?

const getProductKey = product =>
  product.position
    ? [product.hash || product.id, product.position].join('_')
    : product.hash || product.id;

export default ({
  items,
  className,
  columnClass,
  onProductClick,
  config,
  columns,
}: any) => (
  <div className={styles.root}>
    {config.title && <h4 className={styles.title}>{config.title}</h4>}
    <Grid columns={String(12 / columns)} className={className}>
      {items.map((product, i) =>
        React.createElement(ProductCard, {
          ...product,
          key: getProductKey(product),
          index: i,
          config: {
            ...config.product
          },
          columnClass: columnClass,
          onProductClick,
        })
      )}
    </Grid>
  </div>
);
