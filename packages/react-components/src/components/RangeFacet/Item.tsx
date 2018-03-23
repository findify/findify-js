import React from 'react';
import content from 'components/RangeFacet/content';

export default ({ item, theme, style, config }) =>
<button style={style} className={theme.item} onClick={item.toggle}>
  { content({ item, config }) }
</button>
