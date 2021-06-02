import { Children } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import cx from 'classnames';
import Icon from 'components/Icon';

import styles from 'components/Swiper/styles.css';

SwiperCore.use([Navigation, Pagination]);

export default ({ children, theme = styles, slot, ...props }) => {
  const navigation = {
    nextEl: `.${slot}-next`,
    prevEl: `.${slot}-prev`,
  };
  return (
    <div className={theme.root}>
      <button
        aria-label="previous"
        className={cx(theme.prev, navigation.prevEl.substring(1))}
      >
        <Icon
          name="ArrowLeftBig"
          title="Previous slide"
          className={theme.arrow}
        />
      </button>
      <Swiper navigation={navigation} {...props}>
        {Children.map(children, (child) => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
      <button
        aria-label="next"
        className={cx(theme.next, navigation.nextEl.substring(1))}
      >
        <Icon name="ArrowRightBig" title="Next slide" className={theme.arrow} />
      </button>
    </div>
  );
};
