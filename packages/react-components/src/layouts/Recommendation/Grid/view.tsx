/**
 * @module layouts/Recommendation/Grid
 */

import React from 'react';

import Grid from 'components/common/Grid';
import ItemsList from 'components/ItemsList';
import Text from 'components/Text';
import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types/index';
import { List } from 'immutable';
import Product from 'components/Cards/Product'
import MapArray from 'components/common/MapArray';

/** This is a list of props Grid layout for Recommendations accepts */
export interface IGridProps extends ThemedSFCProps {
  /** immutable.List of Products to display */
  items: List<IProduct>;
  /** MJS configuration */
  config: MJSConfiguration;

  columns: string
}


const GridRecommendationLayout = ({ items, config, theme, columns }: IGridProps) =>
<React.Fragment display-if={items && items.size > 0}>
  <Text primary lowercase>{ config.get('title') }</Text>
  <Grid columns={columns}>
    {
      MapArray({
        config,
        array: items,
        factory: Product
      })
    }
  </Grid>
</React.Fragment>

export default GridRecommendationLayout;
