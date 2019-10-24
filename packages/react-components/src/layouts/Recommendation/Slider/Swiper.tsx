import React from 'react';
import { Swiper, Navigation } from 'swiper/js/swiper.esm.js';
import ReactIdSwiper from 'react-id-swiper/lib/ReactIdSwiper.custom';
import Icon from 'components/Icon';

const defaultProps = {
  Swiper,
  modules: [Navigation],
  renderPrevButton: () => <button className="swiper-button-prev"><Icon name='ArrowLeftBig' /></button>,
  renderNextButton: () => <button className="swiper-button-next" ><Icon name='ArrowRightBig' /></button>,
}

export default ({ children, ...props }) => {
  const swiperProps = { ...defaultProps, ...props };
  return (
    <ReactIdSwiper {...swiperProps}>
      {children}
    </ReactIdSwiper>
  )
}
