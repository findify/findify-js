import * as React from 'react';
import {
  compose,
  setDisplayName,
  mapProps,
  defaultProps,
  withPropsOnChange,
  pure,
  withState,
  withHandlers,
} from 'recompose';
import { Product } from 'widgets/Product';
const cx = require('classnames');
import withConfig from 'helpers/withConfig';
import withHooks from 'helpers/withHooks';
import watchFrameSize from 'helpers/watchFrameSize';
import sizeMe from 'react-sizeme';
import Slider from 'react-slick';
import Icon from 'internals/Icon';

import 'match-media'; // Polyfill for slick-slider
import './slider.global.css';
import './slider-theme.global.css';

const styles = require('./styles.css');

const emptyObject = {};

const Arrow = withHandlers({
  onClick: ({ onClick, defaultOnClick }) => () =>
    onClick ? onClick() : defaultOnClick(),
})(
  ({
    dir,
    className,
    currentSlide,
    defaultOnClick,
    slideCount,
    ...props,
  }: any) => (
    <Icon
      {...props}
      name={`chevron-${dir}`}
      className={cx(styles.arrow, className)}
    />
  )
);

const countProductsToShow = width => {
  if (width > 1200) return 6;
  if (width > 900) return 5;
  if (width > 700) return 4;
  if (width > 500) return 3;
  if (width > 300) return 2;
  return 1;
};

export const HOC = compose(
  setDisplayName('ProductsCarousel'),
  withState('target', 'setTarget', void 0),
  withConfig({
    slickSettings: {
      infinite: false,
      slidesToScroll: 1,
      arrows: true,
      lazyLoad: false,
    },
  }),
  sizeMe(),
  withPropsOnChange(['size'], ({ size }) => ({
    slidesToShow: countProductsToShow(size.width),
  })),
  withHooks('slider'), // Deprecated hook
  withHooks('carousel'),
  withHandlers({
    setRef: ({ setTarget, target }) => r => !target && !!r && setTarget(r),
    scrollToLast: ({ target, items, slidesToShow }) => () => {
      if (items.length > slidesToShow) return target.slickGoTo(items.length);
    },
    scrollToFirst: ({ target, items, slidesToShow }) => () => {
      if (items.length > slidesToShow) return target.slickGoTo(0);
    },
  }),
  withPropsOnChange(['config'], ({ config, scrollToFirst, scrollToLast }) => ({
    sliderProps: {
      nextArrow: <Arrow dir="right" defaultOnClick={scrollToFirst} />,
      prevArrow: <Arrow dir="left" defaultOnClick={scrollToLast} />,
    },
  }))
);

export const Component = ({
  items,
  onProductClick,
  slidesToShow,
  sliderProps,
  setRef,
  config: { slickSettings, title, stickers, ...config },
}: any) => (
  <div className={styles.root}>
    {title && <h4 className={styles.title}>{title}</h4>}
    {React.createElement(
      Slider,
      {
        ref: setRef,
        ...sliderProps,
        slidesToShow,
        ...slickSettings,
      },
      items.map((product, i) => (
        <div key={product.hash || product.id}>
          <Product
            {...product}
            index={i}
            onProductClick={onProductClick}
            config={{
              ...config.product,
              currency: config.currency,
              stickers,
            }}
          />
        </div>
      ))
    )}
  </div>
);

export const ProductsCarousel: any = HOC(Component);
