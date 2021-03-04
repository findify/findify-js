import React from 'react';
import Swiper from 'layouts/Recommendation/Slider/Swiper';
import ProductCard from 'components/Cards/Product'
import Text from 'components/Text';
import Icon from 'components/Icon';
import cx from 'classnames';
import useColumns from 'helpers/useColumns';

export default ({ items, config, theme, sliderOptions }) => {
  const slidesPerView = useColumns(
    config.getIn(['grid', 'items'], { default: 2, 500: 3, 700: 4, 900: 5, 1200: 6 })
  );

  return (
    <React.Fragment display-if={items && items.size > 0}>
      <Text title className={theme.title}>
        {config.get('title')}
      </Text>

      <div className={theme.root}>
        <button aria-label="previous" className={cx(theme.prev, `${config.get('slot')}-prev`)}>
          <Icon name='ArrowLeftBig' title='Previous slide' className={theme.arrow} />
        </button>
        <Swiper {...sliderOptions} slidesPerView={slidesPerView}>
          {
            items
              .map(item =>
                <div key={item.hashCode()}>
                  <ProductCard item={item} config={config} />
                </div>
              )
              .toArray()
          }
        </Swiper>
        <button aria-label="next" className={cx(theme.next, `${config.get('slot')}-next`)}>
          <Icon name='ArrowRightBig' title='Next slide' className={theme.arrow} />
        </button>
      </div>
    </React.Fragment>
  )
}
