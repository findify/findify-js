import React from 'react';

export default ({ banner, theme, ...rest }) => console.log('>>>', banner) ||

<a
  display-if={banner && !banner.isEmpty()}
  href={banner.getIn(['products', 'targetUrl'])}
  className={theme.root}>
  <img
    src={banner.getIn(['products', 'imageUrl'])}
    alt={banner.getIn(['products', 'title'])}
    className={theme.image} />
</a>
