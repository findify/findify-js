import React from 'react';
import Slider from 'react-slick';

import ItemsList from '../../../components/ItemsList';
import Title from '../../../components/Title';

export default ({ config, options }) =>
<>
  <Title>{ config.get('title') }</Title>
  <Slider {...options}>
    <ItemsList />
  </Slider>
</>
