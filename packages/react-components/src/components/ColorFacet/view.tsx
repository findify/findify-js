/**
 * @module components/ColorFacet
 */

import React from 'react';

import MapArray from 'components/common/MapArray';
import Item from 'components/ColorFacet/Item';
import { ThemedSFCProps, MJSConfiguration, IFacetValue, IFacet } from 'types';
import { List } from 'immutable';

export interface IColorFacetProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Facet values to render */
  items: List<IFacetValue>;

  facet: IFacet;

  hidden: boolean
}

const ColorFacetView = ({
  theme,
  items,
  config,
  facet,
  hidden
}: IColorFacetProps) => (
  <div className={theme.root} id={`facet-${facet.get('name')}`} role="region" hidden={hidden}>
    <MapArray
      config={config}
      array={items.filter(item => config.getIn(['facets', 'color', 'mapping', (item.get('value') as string)!.toLocaleLowerCase()]))}
      factory={Item}
      theme={theme} />
  </div>
)

export default ColorFacetView;
