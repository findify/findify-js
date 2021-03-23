import { useEffect } from 'react';

/**
 * Hack to emit scroll event
 */
export default (items) => {
  useEffect(() => {
    if (!window) return;
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    return;
  }, [items]);
};
