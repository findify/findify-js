/**
 * @module components/RatingFacet
 */

import React from 'react';
import cx from 'classnames';

import MapArray from 'components/common/MapArray';
import Item from 'components/RatingFacet/Item';
import { IFacet, IFacetValue } from 'types';
import { List } from 'immutable';

/** Props that RatingFacet view accepts */
interface IRatingFacetProps extends ThemedSFCProps {
  /** Facet to extract values from */
  facet: IFacet;
  /** Facet values */
  items: List<IFacetValue>;
  /** MJS Configuration */
  config: MJSConfiguration;
}

const RatingFacet: React.SFC<IRatingFacetProps> = ({
  theme,
  facet,
  items,
  config,
}: IRatingFacetProps) =>
<>
  <MapArray
    display-if={config.get('pullSelected')}
    array={config.get('pullSelected') ? items.filter(i => i.get('selected')) : items}
    factory={Item}
    config={config}
    theme={theme} />

  <MapArray
    array={config.get('pullSelected') ? items.filter(i => !i.get('selected')) : items}
    factory={Item}
    config={config}
    theme={theme} />
</>

export default RatingFacet;
