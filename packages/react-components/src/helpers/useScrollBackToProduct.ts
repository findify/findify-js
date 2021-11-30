import { useEffect } from 'react';

const removeHash = () => {
  history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  );
};

export default (container, item) => {
  const hash = document?.location.hash.substring(1);

  useEffect(() => {
    if (!hash || !container.current || item.get('id') !== hash) return;
    removeHash();
    setTimeout(() => container.current.scrollIntoView(), 500);
  }, [container]);
};
