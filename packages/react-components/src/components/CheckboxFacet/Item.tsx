import React from 'react';
import content from 'components/CheckboxFacet/content';

export default ({ item, theme, style }) =>
  <button style={style} className={theme.item} onClick={item.toggle}>
    { content({ item }) }
  </button>
