import { useMemo } from 'react';

/**
 * Merges theme objects
 * @property theme - new object
 * @property baseStyles - theme
 */
export default (theme = {}, styles = {}) =>
  useMemo<{ [className: string]: string }>(() => ({ ...styles, ...theme }), [
    styles,
  ]);
