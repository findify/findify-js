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
import sizeMe from 'react-sizeme';

const styles = require('./styles.css');

// const isHDPI = (() =>
//   ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3))
// )();

function round(value, exp) {
  value = +value;
  exp = +exp;
  value = value.toString().split('e');
  value = Math.ceil(+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

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
  stage: number;
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
  size: { width?: number }
) => {
  const resolution = isThumb ? '19x' : `${round(size.width, 1)}x`;
  return src.replace(/_(medium|large|small)./g, `_${resolution}.`);
};

const ImageComponent = compose<OwnProps, Props>(
  // sizeMe({ refreshRate: 50 }),
  withPropsOnChange(['src'], ({ src, size }) => {
    // if (src.includes('.shopify')) {
    //   return {
    //     src: void 0,
    //     original: getShopifyUrl(src, false, size),
    //     thumbnail: getShopifyUrl(src, true, size),
    //   };
    // }
    return { src: void 0, original: src };
  }),
  withStateHandlers(
    { src: void 0, stage: 0 },
    {
      setSrc: () => src => ({ src, stage: 2 }),
      setThumbnail: () => src => ({ src, stage: 1 }),
    }
  ),
  withPropsOnChange(
    ['thumbnail', 'original'],
    ({ setSrc, setThumbnail, thumbnail, original }) => {
      if (thumbnail) {
        fetch(thumbnail)
          .then(setThumbnail)
          .then(() => fetch(original))
          .then(setSrc);
      } else {
        fetch(original).then(setSrc);
      }
    }
  ),
  mapProps(({ stage, className, src, alt, onClick }: Props) => ({
    alt,
    onClick,
    src,
    className: cx(
      styles.root,
      className,
      stage === 0 && styles.loading,
      stage === 1 && styles.thumbnail,
      stage === 2 && styles.original
    ),
  })),
  onlyUpdateForKeys(['src'])
)(props => <img {...props} />);

export default ImageComponent;
