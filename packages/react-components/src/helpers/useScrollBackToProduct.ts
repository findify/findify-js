import { useEffect } from 'react';

export default (container, item, shouldScroll) => {
  const hash = document?.location.hash.substring(1);

  useEffect(() => {
    try {
      if (!shouldScroll || !container.current || item.get('id') !== hash) return;
      window.findify.utils.updateHash('')
      setTimeout(() => container.current.scrollIntoView(), 500);
    } catch (err) {
      console.log(err);
    }
  }, [container]);
};
