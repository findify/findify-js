/**
 * @module components/common/Image
 */

import { useRef, useState, useEffect, useMemo } from 'react';
import cx from 'classnames';
import styles from 'components/common/Picture/styles.css';

const useViewPort = (lazy, offset) => {
  if (!lazy) return [true];

  const [ready, setReady] = useState(false);
  const element = useRef(null);

  useEffect(() => {
    if (!element.current || ready) return;
    const callback = () => {
      if (!element.current) return;
      const rect = element.current.getBoundingClientRect();
      const isInView =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom - offset <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right - offset <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (!isInView) return;
      setReady(true);
      document.removeEventListener('scroll', callback);
    };
    callback();
    document.addEventListener('scroll', callback, true);
    return () => document.removeEventListener('scroll', callback);
  }, [element]);

  return [ready, element];
};

export default ({
  aspectRatio,
  lazy,
  offset = 100,
  getSrc,
  getThumbnail,
  src,
  alt,
  thumbnail,
}) => {
  const aspect = aspectRatio > 0;
  const _src = useMemo(
    () => (getSrc && getSrc(src, window.innerWidth)) || src,
    [src]
  );
  const _thumbnail = useMemo(
    () =>
      (getThumbnail && getThumbnail(thumbnail, window.innerWidth)) || thumbnail,
    [thumbnail]
  );
  const [isInViewPort, register] = useViewPort(lazy, offset);
  const [srcLoaded, setLoaded] = useState(false);

  return (
    <div
      ref={register}
      className={cx(
        styles.root,
        (aspect && styles.aspect) || styles.static,
        srcLoaded && styles.ready
      )}
      style={{ paddingBottom: aspect && `${aspectRatio * 100}%` }}
    >
      <img
        src={_src}
        alt={alt}
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
