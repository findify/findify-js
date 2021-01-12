/**
 * @module layouts/Recommendation/Slider
 */
import React from 'react';
import { compose, withPropsOnChange } from 'recompose';
import { connectItems } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import withMinResultsToShow from 'helpers/withMinResultsToShow';
import { Map } from 'immutable';

import 'layouts/Recommendation/Slider/styles.global.css';

import view from 'layouts/Recommendation/Slider/view';
import styles from 'layouts/Recommendation/Slider/styles.css';
import getBreakpoint from 'helpers/getBreakpoint';
import withScrollOnItemsChange from 'helpers/withScrollOnItemsChange';

/**
 * This function is used to calculate products to show in a line of a Slider according to its width
 * @param width Width of slider
 * @returns Number of items to show in a Slider
 */

const breakpoints = {
  300: {
    slidesPerView: 2,
  },
  500: {
    slidesPerView: 3,
  },
  700: {
    slidesPerView: 4,
  },
  900: {
    slidesPerView: 5,
  },
  1200: {
    slidesPerView: 6,
  }
}

export default compose(
  withTheme(styles),

  connectItems,

  withScrollOnItemsChange,

  withMinResultsToShow(),

  withPropsOnChange(['config'], ({ config, size }) => ({
    sliderOptions: {
      breakpoints,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      ...breakpoints[getBreakpoint(breakpoints)],
      ...config.get('sliderOptions', Map()).toJS(),
    }
  }))
)(view);
