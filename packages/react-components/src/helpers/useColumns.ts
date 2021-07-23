import { Breakpoints, Immutable } from '@findify/store-configuration';
import { isImmutable } from 'immutable';
import { useEffect, useMemo, useRef, useState } from 'react';

const cache = {};

export default (
  _media: Breakpoints | Immutable.Factory<Breakpoints>,
  defaultValue = 12
): string => {
  const [keys, media] = useMemo(() => {
    const media = isImmutable(_media) ? _media.toJS() : _media;
    const keys = media
      .sort((a, b) => Number(b.width) - Number(a.width))
      .map(({ width }) => width);
    return [keys, media];
  }, [_media]);

  const mediaQueryLists = keys.map(
    (k) => (cache[k] ||= window.matchMedia(`(min-width: ${k}px)`))
  );

  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    if (typeof keys[index] === 'undefined') return String(defaultValue);

    const match = media.find(({ width }) => width === keys[index]);
    return String(match ? match.value : defaultValue);
  };

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    // Event listener callback
    // Note: By defining getValue outside of useEffect we ensure that it has ...
    // ... current values of hook args (as this hook callback is created once on mount).
    const handler = () => setValue(getValue);
    // Set a listener for each media query with above handler as callback.
    mediaQueryLists.forEach((mql) => mql.addListener(handler));
    // Remove listeners on cleanup
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, []);

  return value;
};
