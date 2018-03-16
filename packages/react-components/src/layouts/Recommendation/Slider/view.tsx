import React from 'react';
import Slider from 'react-slick';

import ItemCard from 'components/ItemCard';
import Title from 'components/Title';

export default ({ items, config, theme, sliderOptions, _mountSlider }) => 
<>
  <Title theme={{ title: theme.title }}>
    { config.get('title') }
  </Title>
  <Slider {...sliderOptions} ref={_mountSlider}>
    {
      items
        .map(item => <div key={item.hashCode()}><ItemCard item={item} /></div>)
        .toArray()
    }
  </Slider>
</>
