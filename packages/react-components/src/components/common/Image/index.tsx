/**
 * @module components/common/Image
 */

import 'core-js/fn/array/includes';
import React from 'react'
import Branch from 'components/common/Branch'
import classNames from 'classnames'
import styles from 'components/common/Image/styles.css';

import {
  branch,
  compose,
  onlyUpdateForKeys,
  withProps,
  mapProps,
  withStateHandlers,
  withPropsOnChange,
  setDisplayName,
  renderNothing,
  renderComponent,
} from 'recompose';


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
  /** @hidden */
  size: { width: number },
  /** @hidden */
  isFixedRatio: boolean
}

const ImageRenderer = ({ src, className, isFixedRatio, aspectRatio }: ImageProps) =>
isFixedRatio
? <div className={className} style={{
    backgroundImage: `url(${src})`,
    paddingBottom: `${100 * aspectRatio!}%`,
    backgroundPosition: 'center center'
  }} />
: <img className={className} src={src} />

// FIXME: Why does it ignore thumbnail now?
export default compose<ImageProps, ImageProps>(
  setDisplayName('Image'),
  onlyUpdateForKeys(['src', 'thumbnail']),
  withPropsOnChange(['src'], ({ src, size }) => {
    return { src: cache.includes(src) ? src : void 0, original: src, }
  }),
  withStateHandlers(
    ({ src, original }) => ({ src, stage: src === original ? 2 : 0 }),
    {
      setSrc: () => src => ({ src, stage: 2 }),
      setThumbnail: () => src => ({ src, stage: 1 })
    }
  ),
  withPropsOnChange(
    ['thumbnail', 'original'],
    ({ setSrc, setThumbnail, thumbnail, original, src, stage }) => {
      if (stage === 2) return;
      if (thumbnail) {
        prefetchImage(thumbnail)
          .then(setThumbnail)
          .then(() => prefetchImage(original))
          .then(setSrc);
      } else {
        prefetchImage(original).then(setSrc);
      }
    }
  ),
  withProps(({ aspectRatio }) => ({
    isFixedRatio: aspectRatio
      && typeof aspectRatio === 'number'
      && !isNaN(aspectRatio)
      && isFinite(aspectRatio),
  })),
  withProps(({ className, stage, isFixedRatio }) => ({
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
    ({ src }) => !!src,
    renderComponent(ImageRenderer),
    renderNothing
  )
)(renderNothing)
