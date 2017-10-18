import * as React from 'react';
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
import * as cx from 'classnames';
import { defer } from 'lodash';

const styles = require('./styles.css');

export interface OwnProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

/**
 * STAGE:
 * 0 - nothing loaded
 * 1 - thumbnail loaded
 * 2 - image loaded
*/
export interface State {
  src: string;
  stage: bumber;
  setSrc: (isMounted: boolean) => void;
  setThumbnail: (isLoading: boolean) => void;
}

export type MappedProps = OwnProps & { src?: string };
export type Props = MappedProps & State;

const fetch = (src: string) =>
  new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', () => resolve(src), false);
    img.src = src;
  });

const getShopifyUrl = (
  src: string,
  isThumb: boolean,
  width?: number,
  height?: number
) => {
  const size = isThumb ? '10x' : !!width ? `${width}x` : 'medium';
  return src.replace(/_(medium|large)./g, `_${size}.`);
};

const ImageComponent = compose<OwnProps, Props>(
  pure,
  withPropsOnChange(['src'], ({ src, width, height }) => {
    if (src.includes('.shopify')) {
      return {
        src: void 0,
        original: getShopifyUrl(src, false, width, height),
        thumbnail: getShopifyUrl(src, true),
      };
    }
    return { src: void 0, original: src };
  }),
  withStateHandlers(
    { src: void 0, stage: 0 },
    {
      setSrc: () => src => ({ src, stage: 2 }),
      setThumbnail: () => src => ({ src, stage: 1 }),
    }
  ),
  withPropsOnChange(['^'], ({ setSrc, setThumbnail, thumbnail, original }) => {
    if (thumbnail) {
      fetch(thumbnail)
        .then(setThumbnail)
        .then(() => fetch(original))
        .then(setSrc);
    } else {
      fetch(original).then(setSrc);
    }
  }),
  mapProps(({ stage, className, src, alt, onClick }: Props) => ({
    alt,
    onClick,
    src,
    className: cx(
      className,
      styles.image,
      stage === 0 && styles.loading,
      stage === 1 && styles.thumbnail,
      stage === 2 && styles.original
    ),
  })),
  onlyUpdateForKeys(['src'])
)(props => <img {...props} />);

export default ImageComponent;
