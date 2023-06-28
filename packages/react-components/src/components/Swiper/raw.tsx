import { Children } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay, Scrollbar]);

export default ({ children, ...props }) => {
  return (
    <Swiper {...props}>
      {Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};
