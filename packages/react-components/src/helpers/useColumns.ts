import { useEffect, useRef, useState } from "react";

type MediaObject = {
  [x: number]: number | string
}

const cache = {};
const DEFAULT_KEY = 'default';

export default (media: MediaObject) => {
  const keys = useRef(Object.keys(media).sort((a, b) => (Number(b) - Number(a))));

  const mediaQueryLists = keys.current
    .filter(k => k !== DEFAULT_KEY)
    .map(k => cache[k] || (cache[k] = window.matchMedia(`(min-width: ${k}px)`)));
  
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches);

    const _value = typeof keys.current[index] !== 'undefined'
      ? media[keys.current[index]]
      : media[DEFAULT_KEY] || 12;
    
    return String(_value)
  };
  
    // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    []
  );

  return value;

}
