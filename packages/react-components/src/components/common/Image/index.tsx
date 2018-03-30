import React from 'react'
import Branch from 'components/common/Branch'
import classNames from 'classnames'
import sizeMe from 'react-sizeme'

import {
  compose,
  lifecycle,
  onlyUpdateForKeys,
  withProps,
  mapProps,
  withStateHandlers,
  withPropsOnChange,
  setDisplayName
} from 'recompose';

import styles from './styles.css'

const prefetchImage = (src: string) =>
  new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', () => resolve(src), false);
    img.src = src;
  });

export default compose(
  sizeMe({
    monitorWidth: true,
    refreshRate: 50
  }),
  setDisplayName('Image'),
  withPropsOnChange(['src'], ({ src, size }) => {
    return { src: void 0, original: src }
  }),
  withStateHandlers(
    { src: void 0, stage: 0 },
    {
      setSrc: () => src => ({ src, stage: 2 }),
      setThumbnail: () => src => ({ src, stage: 1 })
    }
  ),
  withPropsOnChange(
    ['thumbnail', 'original'],
    ({ setSrc, setThumbnail, thumbnail, original }) => {
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
)(({ src, aspectRatio, size: { width }, className, isFixedRatio, ...rest }) => (
  <div className={className} style={isFixedRatio ? {
    height: 1 / aspectRatio * width,
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
  }: {}}>
    <img display-if={!isFixedRatio} src={src} />
  </div>
))
