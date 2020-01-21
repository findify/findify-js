import React, { useState } from 'react';
import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm.js';
import ReactIdSwiper from 'react-id-swiper/lib/ReactIdSwiper.custom';
import Icon from 'components/Icon';

const defaultProps = {
  Swiper,
  modules: [Navigation, Pagination],
  renderPrevButton: () => <button className="swiper-button-prev"><Icon name='ArrowLeftBig' /></button>,
  renderNextButton: () => <button className="swiper-button-next" ><Icon name='ArrowRightBig' /></button>,
  getSwiper: (swiper) => swiper && swiper.on('slideChangeTransitionEnd', () => {
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  })
}

export default ({ children, ...props }) => {
  const swiperProps = { ...defaultProps, ...props };
  return (
    <ReactIdSwiper {...swiperProps}>
      {children}
    </ReactIdSwiper>
  )
}
