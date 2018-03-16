import React from 'react'
import styles from './styles.css'
import ProductCard from '../ProductCard'
import Grid from '../../common/Grid'
import MapArray from '../../common/MapArray';

// TODO: use MapArray for it?

const getProductKey = product =>
  product.get('position')
    ? [product.get('hash') || product.get('id'), product.get('position')].join('_')
    : product.get('hash') || product.get('id')
/*
  product.position
    ? [product.hash || product.id, product.position].join('_')
    : product.hash || product.id; */

const productCardFactory = (props) => React.createElement(ProductCard, props)

export default ({
  items,
  className,
  columnClass,
  onProductClick,
  config,
  columns,
  limit
}: any) => (
  <div className={styles.root}>
    <Grid columns={String(12 / columns)} className={className}>
      <MapArray
        array={items}
        keyAccessor={getProductKey}
        factory={(props) => productCardFactory({...props, columnClass, onProductClick})}
        limit={config.get('meta.item_limit')} />
    </Grid>
  </div>
);
