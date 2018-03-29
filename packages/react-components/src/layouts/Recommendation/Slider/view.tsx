import React from 'react';
import Slider from 'react-slick';

import ItemCard from 'components/ItemCard';
import Text from 'components/Text';

export default ({ items, config, theme, sliderOptions, _mountSlider }) => 
<>
  <Text title className={theme.title}>
    { config.get('title') }
  </Text>

  <Slider {...sliderOptions} ref={_mountSlider}>
    {
      items
        .map(item => <div key={item.hashCode()}><ItemCard item={item} /></div>)
        .toArray()
    }
  </Slider>
</>
