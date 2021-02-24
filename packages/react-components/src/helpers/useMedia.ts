import { useEffect, useRef, useState } from "react";


export default (...media: number[]): boolean[] => {
  const keys = useRef(media.sort().reverse());

  const mediaQueryLists = keys.current
    .map(k => window.matchMedia(`(min-width: ${k}px)`));
  
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches);

    const matched = media.map(m => m <= keys.current[index]);
    return [typeof keys.current[index] !== 'undefined', ...matched.reverse()]
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
