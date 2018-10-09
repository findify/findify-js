import React from 'react';
import Swiper from 'react-id-swiper/lib/custom';
import ProductCard from 'components/Cards/Product'
import Text from 'components/Text';
import { IProduct, ThemedSFCProps, MJSConfiguration } from 'types';
import { List } from 'immutable';

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
