/**
 * @module components/common/Image
 */

import { useRef, useState, useEffect, useMemo } from 'react';
import cx from 'classnames';
import styles from 'components/common/Image/styles.css';

enum LazyStrategy {
  native,
  observer,
  none,
}

const lazyStrategy = ((): LazyStrategy => {
  if ('loading' in HTMLImageElement.prototype) return LazyStrategy.native;
  if ('IntersectionObserver' in global) return LazyStrategy.observer;
  return LazyStrategy.none;
})();

const useViewPort = (lazy) => {
  const isObservable = lazyStrategy === LazyStrategy.observer;
  if (!lazy || !isObservable) return [true];

  const [ready, setReady] = useState(false);
  const element = useRef(null);

  useEffect(() => {
    if (!element.current || ready) return;

    const handleIntersect = (entries, observer) => {
      if (!element.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    });

    observer.observe(element.current as any);
    return () => observer && observer.unobserve(element.current as any);
  }, [element]);

  return [ready, element];
};

export default ({
  aspectRatio,
  lazy,
  getSrc,
  getThumbnail,
  src,
  alt,
  thumbnail,
}) => {
  const aspect = aspectRatio > 0;
  const isNative = lazyStrategy === LazyStrategy.native;

  const _src = useMemo(
    () => (getSrc && getSrc(src, window.innerWidth)) || src,
    [src]
  );

  const _thumbnail = useMemo(
    () =>
      (getThumbnail && getThumbnail(thumbnail, window.innerWidth)) || thumbnail,
    [thumbnail]
  );

  const [isInViewPort, register] = isNative ? [true] : useViewPort(lazy);

  const [srcLoaded, setLoaded] = useState(isNative);

  return (
    <div
      ref={register}
      style={{ paddingBottom: aspect ? `${aspectRatio * 100}%` : 'auto' }}
      className={cx(
        styles.root,
        (aspect && styles.aspect) || styles.static,
        srcLoaded && styles.ready
      )}
    >
      <img
        src={_src}
        alt={alt}
        loading="lazy"
        display-if={isInViewPort}
        onLoad={() => setLoaded(true)}
      />
      <img
        src={_thumbnail}
        alt={alt}
        display-if={isInViewPort && thumbnail}
        className={styles.thumbnail}
      />
    </div>
  );
};
