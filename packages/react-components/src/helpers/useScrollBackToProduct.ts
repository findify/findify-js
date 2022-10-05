import { useEffect } from 'react';

export default (container, item, shouldScroll) => {
  const navigatedProductId = window.localStorage.getItem('findify-navigated-product-id');
  const productId = item.get('id');

  useEffect(() => {
    try {
      if (!shouldScroll || !container.current || navigatedProductId !== productId) return;
      window.localStorage.removeItem('findify-navigated-product-id');
      setTimeout(() => container.current.scrollIntoView(), 500);
    } catch (err) {
      console.log(err);
    }
  }, [container]);
};