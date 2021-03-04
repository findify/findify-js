/**
 * @module layouts/Recommendation/Grid
 */

import React from 'react';

import Grid from 'components/common/Grid';
import Text from 'components/Text';
import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types/index';
import { List } from 'immutable';
import Product from 'components/Cards/Product'
import MapArray from 'components/common/MapArray';
/**
 * @deprecated
 */
import ItemsList from 'components/ItemsList';

/** This is a list of props Grid layout for Recommendations accepts */
export interface IGridProps extends ThemedSFCProps {
  /** immutable.List of Products to display */
  items: List<IProduct>;
  /** MJS configuration */
  config: MJSConfiguration;

  columns: string
}


const GridRecommendationLayout = ({ items, config, columns }: IGridProps) => {
  if (!items || !items.size) return null;
  return (
    <>
      <Text primary lowercase>{ config.get('title') }</Text>
      <Grid columns={config.getIn(['grid', 'items'], { 400: 6, 600: 4, 1000: 3 })}>
        {
          MapArray({
            config,
            array: items,
            factory: Product
          })
        }
      </Grid>
    </>
  )
}

export default GridRecommendationLayout;
