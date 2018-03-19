import React from 'react'
import styles from './styles.css'
import ProductCard from '../ProductCard'
import Grid from '../../common/Grid'
import MapArray from '../../common/MapArray';
import ItemsList from '../../ItemsList'

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
    <ItemsList
      wrapper={Grid}
      columns={String(12 / columns)}
      className={className}
      limit={config.getIn(['meta', 'item_limit'])}
      factory={(props) => productCardFactory({...props, columnClass, onProductClick, config })}
      keyAccessor={getProductKey} />
  </div>
);
