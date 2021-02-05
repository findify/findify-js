import React from 'react';
import Swiper from 'layouts/Recommendation/Slider/Swiper';
import ProductCard from 'components/Cards/Product'
import Text from 'components/Text';
import Icon from 'components/Icon';

export default ({ items, config, theme, sliderOptions }) =>
<React.Fragment display-if={items && items.size > 0}>
  <Text title className={theme.title}>
    { config.get('title') }
  </Text>

  <div className="findify-swiper-wrapper">
    <button aria-label="previous" className={`findify-swiper-button-prev ${config.get('slot')}-prev`}>
      <Icon name='ArrowLeftBig' className={theme.arrow}/>
    </button>
    <Swiper {...sliderOptions}>
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
    <button aria-label="next" className={`findify-swiper-button-next ${config.get('slot')}-next`}>
      <Icon name='ArrowRightBig' className={theme.arrow}/>
    </button>
  </div>
</React.Fragment>
