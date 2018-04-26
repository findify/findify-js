import React from 'react';
import Icon from 'components/Icon';

export default ({ item, config }) =>
<>
  {
    [...Array(item.get('from') + 1).keys()]
    .map((_, i) => <Icon name='Star' key={i} />)
  }
</>
