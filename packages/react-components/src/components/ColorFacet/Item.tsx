import React from 'react';
import content from 'components/ColorFacet/content';

export default ({ item, theme, config }) =>
<button className={theme.item} onClick={item.toggle}>
  { content({ item, config, theme }) }
</button>
