import { useEffect, useRef } from 'react';

const cache = {};

const makeItem = (item) => ({
  item_id: item.get('id'),
  variant_item_id: item.get('selected_variant_id'),
  rid: item.meta.get('rid'),
  visible_at: [],
});

const handleViewportChange = (item, isInViewport) => {
  if (!isInViewport && !cache[item.get('id')]) return;

  const cachedItem = (cache[item.get('id')] =
    cache[item.get('id')] || makeItem(item));

  if (isInViewport) {
    cachedItem.visible_at.push([Date.now()]);
  } else {
    cachedItem.visible_at[cachedItem.visible_at.length - 1].push(Date.now());
  }
};

export default (item) => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current || !('IntersectionObserver' in window)) return;

    const handleIntersect = (entries) => {
      if (!container.current) return;
      entries.forEach((entry) => {
        handleViewportChange(item, entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    observer.observe(container.current as any);
    item.analytics.onLeavePage((ranges) => {
      item.analytics.sendEvent('dwell-list', {
        visible_at: ranges,
        items: Object.keys(cache).map((k) => cache[k]),
      });
    }, 'list');
    return () => observer && observer.unobserve(container.current as any);
  }, []);

  return container;
};
