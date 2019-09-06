/**
 * @module components/autocomplete/ProductMatches
 */

import React, { useEffect } from 'react'
import ProductCard from 'components/Cards/Product'
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import ItemsList from 'components/ItemsList';
import Button from 'components/Button'
import styles from 'components/autocomplete/ProductMatches/styles.css';
import { List, Map } from 'immutable'
import { ThemedSFCProps, GetSuggestionPropsFunction, IProduct, ISuggestion, MJSConfiguration, WidgetAwareProps, SuggestionsConnectedProps } from 'types';

/**
 * This function extracts key used for rendering in React from Product
 * @name prodkey
 * @param product Product to extract key from
 * @returns Product key used for rendering
 */
const getProductKey = (product: IProduct): string =>
  (product.get('position')
    ? [product.get('hash') || product.get('id'), product.get('position')].join('_')
    : product.get('hash') || product.get('id')) as string

const productCardFactory = React.createFactory(ProductCard)

/** This is a list of props which ProductMatches view for Autocomplete accepts */
export interface IProductMatchesProps extends ThemedSFCProps, WidgetAwareProps, SuggestionsConnectedProps {
  /** List of products */
  items: List<IProduct>,
  /** Custom classname */
  className?: string,
  /** Class for each column where Product will be rendered */
  columnClass?: string
  /** MJS Configuration object */
  config: MJSConfiguration,
  /** Number of columns to render Products */
  columns: number,
  /** Maximum amount of products to render */
  limit: number,
}

/**
 * @param param0 Props that ProductMatchesView for Autocomplete accepts
 */
const ProductMatchesView: React.SFC<IProductMatchesProps> = ({
  items,
  className,
  columnClass,
  config,
  columns,
  limit,
  theme,
  suggestions,
  getSuggestionProps,
  widgetKey,
}: IProductMatchesProps) => (
  <div className={styles.root}>
    <ItemsList
      wrapper={Grid}
      columns={String(12 / 1)}
      columnClass={theme.gridColumnClass}
      className={className}
      limit={config.getIn(['meta', 'item_limit'])}
      theme={theme}
      config={config}
      factory={ProductCard}
    />
    <Button
      display-if={suggestions && suggestions.size > 0 && config.get('showViewMoreButton')}
      className={theme.viewMoreButton}
      onClick={suggestions && suggestions.size > 0 && getSuggestionProps(0, widgetKey).onClick}>
      {config.getIn(['i18n', 'viewMore'])}
    </Button>
  </div>
);

export default ProductMatchesView
