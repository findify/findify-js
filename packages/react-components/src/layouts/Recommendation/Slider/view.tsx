import React from 'react';
import Swiper from 'layouts/Recommendation/Slider/Swiper';
import ProductCard from 'components/Cards/Product'
import Text from 'components/Text';

export default ({ items, config, theme, sliderOptions }) =>
<React.Fragment display-if={items && items.size > 0}>
  <Text title className={theme.title}>
    { config.get('title') }
  </Text>

  <div className="findify-swiper-wrapper">
    <button aria-label="previous" className={`findify-swiper-button-prev ${config.get('slot')}-prev`}>
      <svg width="11" height="19" className="findify-components--icon" xmlns="http://www.w3.org/2000/svg"><path d="M3.064 9.507L11 1.539 9.468 0 0 9.507 9.454 19l1.532-1.539z" fill="currentColor"></path></svg>
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
      <svg width="11" height="19" className="findify-components--icon" xmlns="http://www.w3.org/2000/svg"><path d="M7.936 9.507L0 1.539 1.532 0 11 9.507 1.546 19 .014 17.461z" fill="currentColor"></path></svg>
    </button>
  </div>
</React.Fragment>
