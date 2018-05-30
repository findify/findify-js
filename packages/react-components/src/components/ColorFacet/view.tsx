/**
 * @module components/ColorFacet
 */

import React from 'react';

import MapArray from 'components/common/MapArray';
import Item from 'components/ColorFacet/Item';
import { ThemedSFCProps, MJSConfiguration, IFacetValue } from 'types';
import { List } from 'immutable';

interface IColorFacetProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Facet values to render */
  items: List<IFacetValue>
}

const ColorFacetView = ({
  theme,
  items,
  config,
}: IColorFacetProps) =>
<div className={theme.root}>
  <div className={theme.container}>
    <MapArray
      config={config}
      array={items.filter(item => config.getIn(['facets', 'color', 'mapping', (item.get('value') as string)!.toLocaleLowerCase()]))}
      factory={Item}
      theme={theme} />
  </div>
</div>

export default ColorFacetView;
