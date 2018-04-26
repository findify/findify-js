import React from 'react';
import Slider from 'react-slick';

import ProductCard from 'components/Cards/Product'
import Text from 'components/Text';

export default ({ items, config, theme, sliderOptions, _mountSlider }) => 
<>
  <Text title className={theme.title}>
    { config.get('title') }
  </Text>

  <Slider {...sliderOptions} ref={_mountSlider}>
    {
      items
        .map(item =>
          <div key={item.hashCode()}>
            <ProductCard item={item} config={config} />
          </div>
        )
        .toArray()
    }
  </Slider>
</>
