/**
 * @module layouts/Recommendation/Slider
 */
import React from 'react';
import { compose, withPropsOnChange, withStateHandlers, withHandlers, defaultProps } from 'recompose';
import { connectItems } from '@findify/react-connect';
import sizeMe from 'react-sizeme';
import withTheme from 'helpers/withTheme';
import withMinResultsToShow from 'helpers/withMinResultsToShow';
import { renderArrow } from 'layouts/Recommendation/Slider/Arrow';
import view from 'layouts/Recommendation/Swiper/view';
import { Map } from 'immutable';

import 'layouts/Recommendation/Swiper/styles.global.css';
import styles from 'layouts/Recommendation/Swiper/styles.css';

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
  return 2;
};

export default compose(
  withTheme(styles),
  connectItems,
  sizeMe(),

  withStateHandlers(
    { instance: undefined },
    { _mountSlider: (initial) => (instance = initial) => ({ instance }) }
  ),

  withMinResultsToShow(),

  withPropsOnChange(['config', 'size'], ({ config, size }) => ({
    sliderOptions: {
      slidesPerView: countProductsToShow(size.width),
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      ...config.get('sliderOptions', Map()).toJS(),
    }
  }))
)(view);
