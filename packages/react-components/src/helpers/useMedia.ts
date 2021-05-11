import { useEffect, useRef, useState } from 'react';

const cache = {};

export default (..._breakpoints: number[]): boolean[] => {
  const breakpoints: number[] = _breakpoints;

  const keys = useRef(breakpoints.sort().reverse());

  keys.current.forEach((k) => {
    if (cache[k]) return;
    cache[k] = window.matchMedia(`(min-width: ${k}px)`);
  });

  const getValue = () => {
    const match = keys.current.find((k) => cache[k].matches);
    const matched = keys.current.map((k) => match === k);
    return [!match, ...matched.reverse()];
  };

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    // Event listener callback
    // Note: By defining getValue outside of useEffect we ensure that it has ...
    // ... current values of hook args (as this hook callback is created once on mount).
    const handler = () => setValue(getValue);
    // Set a listener for each media query with above handler as callback.
    keys.current.forEach((k) => cache[k].addListener(handler));
    // Remove listeners on cleanup
    return () => keys.current.forEach((k) => cache[k].removeListener(handler));
  }, []);

  return value;
};
