import React from 'react';
import Swiper from 'layouts/Recommendation/Slider/Swiper';
import ProductCard from 'components/Cards/Product'
import Text from 'components/Text';

export default ({ items, config, theme, sliderOptions }) =>
<React.Fragment display-if={items && items.size > 0}>
  <Text title className={theme.title}>
    { config.get('title') }
  </Text>

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
</React.Fragment>
