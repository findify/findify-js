/**
 * @module components/RatingFacet
 */

import MapArray from 'components/common/MapArray';
import Item from 'components/RatingFacet/Item';
import { IFacet, IFacetValue, MJSConfiguration, ThemedSFCProps } from 'types';
import { List } from 'immutable';
import styles from 'components/RatingFacet/styles.css';

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

export default ({
  theme = styles,
  facet,
  config,
  hidden,
}: IRatingFacetProps) => {
  return (
    <div
      className={theme.root}
      id={`facet-${facet.get('name')}`}
      role="region"
      hidden={hidden}
    >
      <MapArray
        display-if={config.get('pullSelected')}
        factory={Item}
        config={config}
        theme={theme}
        array={
          config.get('pullSelected')
            ? facet.get('values').filter((i) => i.get('selected'))
            : facet.get('values')
        }
      />

      <MapArray
        factory={Item}
        config={config}
        theme={theme}
        array={
          config.get('pullSelected')
            ? facet.get('values').filter((i) => !i.get('selected'))
            : facet.get('values')
        }
      />
    </div>
  );
};
