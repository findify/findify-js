import React from 'react'

export default ({ item, theme }) => (
  <div className={theme.root}>
    <h4 className={theme.title}>{ item.get('title') }</h4>
    <img className={theme.image} src={item.get('image_url')} />
  </div>
);
