/**
 * @module components/ColorFacet
 */

import { memo } from 'react';
import cx from 'classnames';
import { IFacetValue, MJSConfiguration } from 'types';

/**
 * Defines if color is light or dark
 * @param hex Color Hex value
 */
const checkIfLight = (hex) => {
  const _hex = hex.replace('#', '');
  const str = _hex.length < 6 ? _hex + _hex : _hex;
  const number = Number.parseInt(str, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;
  return (red * 299 + green * 587 + blue * 114) / 1000 > 220;
};
/**
 * Used to retrieve CSS styles for each facet
 * @param item Facet value
 * @param config MJS configuration to pull mapping from
 */
const getStyles = (item: IFacetValue, config: MJSConfiguration) => {
  const value = (item.get('value') as string)!.toLowerCase();
  const background = config.getIn(['facets', 'color', 'mapping', value], value);
  const isLight = background.startsWith('#') && checkIfLight(background);
  return {
    ball: {
      background: background,
      color: isLight ? 'black' : 'white',
    },
    border: {
      borderColor: isLight ? '#C6C6C6' : 'transparent',
    },
  };
};

export default memo(({ item, config, theme, children, isMobile }) => {
  const styles = getStyles(item, config);
  return (
    <a title={item.get('value')} style={styles.ball} className={cx(theme.ball, {
      [theme.ballMobile]: isMobile,
    })}>
      <span style={styles.border} />
      {children}
    </a>
  );
});
