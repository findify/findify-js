/**
 * @module components/RatingFacet
 */

import * as React from 'react';

import MapArray from 'components/common/MapArray';
import Item from 'components/RatingFacet/Item';
import { IFacet, IFacetValue, MJSConfiguration, ThemedSFCProps } from 'types';
import { List } from 'immutable';

/** Props that RatingFacet view accepts */
export interface IRatingFacetProps extends ThemedSFCProps {
  /** Facet to extract values from */
  facet: IFacet;
  /** Facet values */
  items: List<IFacetValue>;
  /** MJS Configuration */
  config: MJSConfiguration;

  hidden: boolean;
}

const RatingFacet: React.SFC<IRatingFacetProps> = ({
  theme,
  facet,
  items,
  config,
  hidden,
}: IRatingFacetProps) => (
  <div
    className={theme.root}
    id={`facet-${facet.get('name')}`}
    role="region"
    hidden={hidden}
  >
    <MapArray
      display-if={config.get('pullSelected')}
      array={
        config.get('pullSelected')
          ? items.filter((i) => i.get('selected'))
          : items
      }
      factory={Item}
      config={config}
      theme={theme}
    />

    <MapArray
      array={
        config.get('pullSelected')
          ? items.filter((i) => !i.get('selected'))
          : items
      }
      factory={Item}
      config={config}
      theme={theme}
    />
  </div>
);

export default RatingFacet;
