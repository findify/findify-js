/**
 * @module components/common/Image
 */

import 'core-js/fn/array/includes';
import React from 'react'
import classNames from 'classnames'
import styles from 'components/common/Image/styles.css';

import {
  branch,
  compose,
  withProps,
  withStateHandlers,
  withPropsOnChange,
  setDisplayName,
  renderNothing,
  renderComponent,
  withHandlers,
} from 'recompose';

/** FIXME: Possible memory leak on huge pages, maybe employ something like LRU? */
const cache = [];

const prefetchImage = (src: string) =>
  new Promise(resolve => {
    if (cache.includes(src)) return resolve(src);
    const img = new Image();
    img.addEventListener('load', () => {
      cache.push(src)
      resolve(src);
    }, false);
    img.src = src;
  });

/** This is a list of props which Image component accepts */
export interface ImageProps {
  /** Custom classname */
  className?: string,
  /** Source to original image */
  src: string,
  /** Source to thumbnail, which will be showed blurred during loading */
  thumbnail?: string,
  /** Width / height ratio, to which image will conform */
  aspectRatio?: number,
  /** Render image only when it is in viewport */
  lazy?: boolean,
  /** Distance to image when it should start render [default: 100px] */
  offset?: number,
  /** @hidden */
  size: { width: number },
  /** @hidden */
  isFixedRatio: boolean
}

const waitForViewPort = (node, offset = 100) => new Promise(resolve => {
  const callback = () => {
    const rect = node.getBoundingClientRect();
    const isInView =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom - offset <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right - offset <= (window.innerWidth || document.documentElement.clientWidth);
    if (!isInView) return;
    document.removeEventListener('scroll', callback);
    resolve(true);
  }
  document.addEventListener('scroll', callback);
  callback();
}) 

const ImageRenderer = ({ src, className, isFixedRatio, aspectRatio }: ImageProps) =>
isFixedRatio
? <div className={className} style={{
    backgroundImage: `url(${src})`,
    paddingBottom: `${100 * aspectRatio!}%`,
    backgroundPosition: 'center center'
  }} />
: <img className={className} src={src} />

const LazyRenderer = withHandlers({
  registerComponent: ({ setReady, offset }) => (ref) =>
    ref && waitForViewPort(ref, offset).then(setReady)
})(({ registerComponent, lazy, className }) =>
  !!lazy && <div className={className} ref={registerComponent} />
)

// FIXME: Why does it ignore thumbnail now?
export default compose<ImageProps, ImageProps>(
  setDisplayName('Image'),
  withPropsOnChange(['src'], ({ src, size }) => ({
    src: cache.includes(src) ? src : void 0,
    original: src,
    key: src
  })),
  withStateHandlers(
    ({ src, original, lazy }) => ({
      src,
      ready: !lazy || !!src,
      stage: src === original ? 2 : 0
    }),
    {
      setSrc: (state) => src => ({ ...state, src, stage: 2 }),
      setThumbnail: (state) => src => ({ ...state, src, stage: 1 }),
      setReady: (state) => ready => ({ ...state, ready })
    }
  ),
  withPropsOnChange(
    ['thumbnail', 'original', 'ready'],
    ({ setSrc, setThumbnail, thumbnail, original, src, stage, fetchImage = prefetchImage, ready }) => {
      if (!ready) return;
      if (stage === 2) return;
      if (thumbnail) {
        fetchImage(thumbnail)
          .then(setThumbnail)
          .then(() => fetchImage(original))
          .then(setSrc);
      } else {
        fetchImage(original).then(setSrc);
      }
    }
  ),
  withProps(({ aspectRatio, className, stage, isFixedRatio }) => ({
    isFixedRatio: aspectRatio
      && typeof aspectRatio === 'number'
      && !isNaN(aspectRatio)
      && isFinite(aspectRatio),
    className: classNames(
      className,
      {
        [styles.root]: !isFixedRatio,
        [styles.croppedRoot]: isFixedRatio,
        [styles.loading]: stage === 0,
        [styles.thumbnail]: stage === 1,
        [styles.original]: stage === 2,
      }
    )
  })),
  branch(
    ({ ready, src }) => ready && src,
    renderComponent(ImageRenderer),
    renderComponent(LazyRenderer)
  )
)(renderNothing);
