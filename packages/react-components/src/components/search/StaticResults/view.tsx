/**
 * @module components/search/StaticResults
 */

import React from 'react';
import Grid from 'components/common/Grid';
import PoweredBy from 'components/PoweredBy';
import Pagination from 'components/Pagination';
import { ThemedSFCProps, MJSConfiguration } from 'types';
import { useItems } from '@findify/react-connect';
import MapArray from 'components/common/MapArray';
import ProductCard from 'components/Cards/Product';

/**
 * @deprecated
 */
import ItemsList from 'components/ItemsList';

/** Props that StaticResults accepts */
export interface IStaticResultsProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Number of columns that one item occupies in 12-col grid */
  columns: number;
};

const StaticResultsView = ({ columns, theme }: IStaticResultsProps) => {
  const { items, config } = useItems();
  return (
    <div
      className={theme.root}
      role='main'
      aria-label={`${config.getIn(['a11y', 'searchResults'], 'Search results')}`}
      tabIndex={0}
    >
      <Grid columns={columns}>
        {
          MapArray({
            array: items,
            factory: ProductCard,
            config,
          })
        }
      </Grid>
    
      <Pagination />
      <PoweredBy />
    </div>
  )
}

export default StaticResultsView;
