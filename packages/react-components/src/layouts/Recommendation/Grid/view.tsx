/**
 * @module layouts/Recommendation/Grid
 */

import React from 'react';

import Grid from 'components/common/Grid';
import ItemsList from 'components/ItemsList';
import Text from 'components/Text';
import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types';
import { List } from 'immutable';

/** This is a list of props Grid layout for Recommendations accepts */
interface IGridProps extends ThemedSFCProps {
  /** immutable.List of Products to display */
  items: List<IProduct>;
  /** MJS configuration */
  config: MJSConfiguration;
}


const GridRecommendationLayout = ({ items, config, theme }: IGridProps) =>
<React.Fragment display-if={items && items.size > 0}>
  <Text primary lowercase>{ config.get('title') }</Text>
  <ItemsList wrapper={Grid} columns='3' />
</React.Fragment>

export default GridRecommendationLayout;
