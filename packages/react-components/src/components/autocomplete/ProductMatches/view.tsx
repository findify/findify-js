import React from 'react'
import ProductCard from 'components/productcard/ProductCard'
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import ItemsList from 'components/ItemsList';
import Button from 'components/Button'
import styles from 'components/autocomplete/ProductMatches/styles.css';

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
  limit,
  theme,
  suggestions,
  getSuggestionProps
}: any) => (
  <div className={styles.root}>
    <ItemsList
      wrapper={Grid}
      columns={String(12 / 1)}
      columnClass={theme.gridColumnClass}
      className={className}
      limit={config.getIn(['meta', 'item_limit'])}
      factory={(props) => productCardFactory({...props, columnClass, onProductClick, config, theme })}
      keyAccessor={getProductKey} />
    <Button
      display-if={suggestions && suggestions.size > 0}
      className={theme.viewMoreButton}
      onClick={suggestions && suggestions.size > 0 && getSuggestionProps(0).onClick}>
      {config.getIn(['i18n', 'viewMore'])}
    </Button>
  </div>
);
