import React from 'react';

export default ({ item, theme, style }) =>
<button style={style} className={theme.item} onClick={item.toggle}>
  { item.get('from') }
  { item.get('to') }
</button>
