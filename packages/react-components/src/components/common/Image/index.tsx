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

const getSource = (src, fx): string[] =>
  useMemo(() => {
    const res = (fx && fx(src, window?.innerWidth)) || src;
    if (!res) return [];

    return (typeof res === 'string' ? [res] : res).filter(
      (value, index, self) => value && self.indexOf(value) === index
    );
  }, [src]);

type ImageProps = {
  aspectRatio: number;
  lazy?: boolean;
  getSrc: (src: string | string[], width: number) => string | string[];
  getThumbnail: (src: string | string[], width: number) => string | string[];
  src: string | string[];
  thumbnail: string;
  alt: string;
  multiple: boolean;
};

export default ({
  aspectRatio,
  lazy,
  getSrc,
  getThumbnail,
  src,
  alt,
  thumbnail,
}: ImageProps) => {
  const aspect = aspectRatio > 0;
  const isNative = lazyStrategy === LazyStrategy.native;

  const _src = getSource(src, getSrc);

  const _thumbnail = getSource(thumbnail, getThumbnail);

  const [isInViewPort, register] = isNative ? [true] : useViewPort(lazy);

  const [srcLoaded, setLoaded] = useState(isNative);
  return (
    <div
      ref={register}
      style={{
        paddingBottom: aspect ? `${aspectRatio * 100}%` : 'auto',
      }}
      className={cx(
        styles.root,
        (aspect && styles.aspect) || styles.static,
        srcLoaded && styles.ready,
        _src.length > 1 && styles.multiple
      )}
    >
      {_src.map((src, index) => (
        <img
          src={src}
          key={src}
          alt={alt}
          loading={lazy ? 'lazy' : undefined}
          className={cx(styles.image, index && styles.next)}
          display-if={isInViewPort}
          onLoad={() => setLoaded(true)}
        />
      ))}
      {_thumbnail.map((src) => (
        <img
          src={src}
          key={src}
          alt={alt}
          display-if={isInViewPort && thumbnail}
          className={styles.thumbnail}
        />
      ))}
    </div>
  );
};
