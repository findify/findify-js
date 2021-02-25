import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

export default ({ children, ...props }) => (
  <Swiper {...props}>
    {
      React.Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))
    }
  </Swiper>
)
