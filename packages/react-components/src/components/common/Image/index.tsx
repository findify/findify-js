import React from 'react'
import Branch from 'components/common/Branch'
import classNames from 'classnames'
import sizeMe from 'react-sizeme'

import {
  compose,
  pure,
  lifecycle,
  onlyUpdateForKeys,
  withProps,
  mapProps,
  withStateHandlers,
  withPropsOnChange,
  setDisplayName
} from 'recompose';

import styles from 'components/common/Image/styles.css';

const prefetchedImages = {}

const prefetchImage = (src: string) =>
  new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', () => {
      prefetchedImages[src] = true
      resolve(src)
    }, false);
    img.src = src;
  });

/** This is a list of props which Image component accepts */
interface ImageProps {
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

export default compose(
  sizeMe({
    monitorWidth: true,
    refreshRate: 50
  }),
  setDisplayName('Image'),
  onlyUpdateForKeys(['src', 'thumbnail']),
  withPropsOnChange(['src'], ({ src, size }) => {
    return { src: prefetchedImages[src] ? src : void 0, original: src, }
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
    isFixedRatio: aspectRatio && typeof aspectRatio === 'number' && !isNaN(aspectRatio) &&isFinite(aspectRatio),
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
)(({ src, aspectRatio, size: { width }, className, isFixedRatio }: ImageProps) => (
  <div className={className} style={isFixedRatio ? {
    height: 1 / aspectRatio * width,
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
  }: {}}>
    <img display-if={!isFixedRatio} src={src} />
  </div>
))
