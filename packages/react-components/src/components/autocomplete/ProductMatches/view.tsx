/**
 * @module components/autocomplete/ProductMatches
 */

import * as React from 'react';
import ProductCard from 'components/Cards/Product';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import Button from 'components/Button';
import styles from 'components/autocomplete/ProductMatches/styles.css';
import { List } from 'immutable';
import {
  ThemedSFCProps,
  IProduct,
  MJSConfiguration,
  WidgetAwareProps,
  SuggestionsConnectedProps,
} from 'types';
import { useItems, useSuggestions } from '@findify/react-connect';
/**
 * @deprecated
 */
import ItemsList from 'components/ItemsList';
import useTranslations from 'helpers/useTranslations';
import { Immutable } from '@findify/store-configuration';

/** This is a list of props which ProductMatches view for Autocomplete accepts */
export interface IProductMatchesProps
  extends ThemedSFCProps,
    WidgetAwareProps,
    SuggestionsConnectedProps {
  /** List of products */
  items: List<IProduct>;
  /** Custom classname */
  className?: string;
  /** Class for each column where Product will be rendered */
  columnClass?: string;
  /** MJS Configuration object */
  config: MJSConfiguration;
  /** Number of columns to render Products */
  columns: number;
  /** Maximum amount of products to render */
  limit: number;
}

/**
 * @param param0 Props that ProductMatchesView for Autocomplete accepts
 */
export default () => {
  const { items, config } = useItems<Immutable.AutocompleteConfig>();
  return (
    <div className={styles.root} display-if={!!items.size}>
      <Grid columns={config.getIn(['breakpoints', 'grid'], '12')}>
        {MapArray({
          array: items,
          limit: config.getIn(['defaultRequestParams', 'item_limit']),
          factory: ProductCard,
          config: config.get('product'),
        })}
      </Grid>
    </div>
  );
};
