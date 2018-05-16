/**
 * @module layouts/Recommendation/Slider
 */

import { compose, withPropsOnChange, withStateHandlers, withHandlers, defaultProps } from 'recompose';
import { connectItems } from '@findify/react-connect';
import sizeMe from 'react-sizeme';
import withTheme from 'helpers/withTheme';
import { renderArrow } from 'layouts/Recommendation/Slider/Arrow';
import view from 'layouts/Recommendation/Slider/view';

import './styles.global.css';
import styles from 'layouts/Recommendation/Slider/styles.css';

/**
 * This function is used to calculate products to show in a line of a Slider according to its width
 * @param width Width of slider
 * @returns Number of items to show in a Slider
 */
const countProductsToShow = width => {
  if (width > 1200) return 6;
  if (width > 900) return 5;
  if (width > 700) return 4;
  if (width > 500) return 3;
  if (width > 300) return 2;
  return 1;
};

export default compose(
  withTheme(styles),

  sizeMe(),

  withStateHandlers(
    { instance: undefined },
    { _mountSlider: (initial) => (instance = initial) => ({ instance }) }
  ),

  connectItems,

  withHandlers({
    scrollToLast: ({ instance, items, size }) => () =>
      items.length > countProductsToShow(size.width) && instance.slickGoTo(items.length),
    scrollToFirst: ({ instance, items, size }) => () => {
      items.length > countProductsToShow(size.width) && instance.slickGoTo(0);
    }
  }),

  withPropsOnChange(['config', 'size'], ({ config, size, scrollToFirst, scrollToLast }) => ({
    sliderOptions: {
      infinite: false,
      slidesToScroll: 1,
      arrows: true,
      lazyLoad: false,
      slidesToShow: countProductsToShow(size.width),
      nextArrow: renderArrow('right' , scrollToFirst),
      prevArrow: renderArrow('left', scrollToLast),
      ...config.get('sliderOptions'),
    }
  }))
)(view);
