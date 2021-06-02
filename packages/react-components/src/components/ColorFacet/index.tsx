/**
 * @module components/ColorFacet
 */

import MapArray from 'components/common/MapArray';
import Item from 'components/ColorFacet/Item';
import { ThemedSFCProps, MJSConfiguration, IFacetValue, IFacet } from 'types';
import { List } from 'immutable';
import styles from 'components/ColorFacet/styles.css';

export interface IColorFacetProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Facet values to render */
  items: List<IFacetValue>;

  facet: IFacet;

  hidden: boolean;

  isMobile?: boolean;
}

export default ({
  facet,
  hidden,
  theme = styles,
  isMobile,
  config,
}: IColorFacetProps) => {
  const mapping = config.get('colorMapping');

  return (
    <div
      className={theme.root}
      id={`facet-${facet.get('name')}`}
      role="region"
      hidden={hidden}
    >
      <MapArray
        config={config}
        array={facet.get('values').filter((i) => mapping.has(i.get('value')))}
        factory={Item}
        theme={theme}
        isMobile={isMobile}
      />
    </div>
  );
};
