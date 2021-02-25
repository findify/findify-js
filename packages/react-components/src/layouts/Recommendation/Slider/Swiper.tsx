import React, { useState } from 'react';
import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm.js';
import ReactIdSwiper from 'react-id-swiper/lib/ReactIdSwiper.custom';
import Icon from 'components/Icon';

const defaultProps = {
  Swiper,
  modules: [Navigation, Pagination],
  getSwiper: (swiper) => swiper && swiper.on('slideChangeTransitionEnd', () => {
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  })
}

export default ({ children, ...props }) => (
  <ReactIdSwiper {...defaultProps} {...props }>
    {children}
  </ReactIdSwiper>
)
