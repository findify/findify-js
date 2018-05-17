/**
 * @module components/ColorFacet
 */

import React from 'react';
// import color from 'tinycolor2';
import { IFacetValue, MJSConfiguration } from 'types';

/**
 * Used to retrieve CSS styles for each facet
 * @param item Facet value
 * @param config MJS configuration to pull mapping from
 */
const getStyles = (item: IFacetValue, config: MJSConfiguration) => {
  const value = (item.get('value') as string)!.toLowerCase();
  const background = config.getIn(['facets', 'color', 'mapping', value], value);
  return {
    ball: { background },
    // check: { color: color(background).isDark() ? '#fff' : '#333' }
  }
};

export default ({ item, config, theme }) => {
  const styles = getStyles(item, config);
  return <span style={styles.ball} className={theme.ball}/>
}
