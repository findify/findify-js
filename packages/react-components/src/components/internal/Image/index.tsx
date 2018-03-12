import React from 'react'
import classNames from 'classnames'

import {
  compose,
  lifecycle,
  onlyUpdateForKeys,
  pure,
  withProps,
  mapProps,
  withStateHandlers,
  withPropsOnChange,
} from 'recompose';

import styles from './styles.css'

const prefetchImage = (src: string) =>
  new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', () => resolve(src), false);
    img.src = src;
  });

const ImageComponent = compose(
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
          .then(() => fetch(original))
          .then(setSrc);
      } else {
        prefetchImage(original).then(setSrc);
      }
    }
  ),
  mapProps(({ stage, className, src, alt, onClick, style }) => ({
    alt,
    onClick,
    src,
    style,
    className: classNames(
      styles.root,
      className,
      stage === 0 && styles.loading,
      stage === 1 && styles.thumbnail,
      stage === 2 && styles.original
    ),
  })),
  onlyUpdateForKeys(['src'])
)(props => <img {...props} />)

export default ImageComponent
