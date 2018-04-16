import React from 'react'
import Image from 'components/common/Image';

export default ({ item, theme }) => (
  <div className={theme.root}>
    <h4 className={theme.title}>{ item.get('title') }</h4>
    <Image src={item.get('image_url')} />
  </div>
);
