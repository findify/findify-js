import React from 'react';
import cx from 'classnames';

import MapArray from 'components/common/MapArray';
import Item from 'components/CategoryFacet/Item';

export default ({
  theme,
  items,
  config,
  facet,
  total
}) => 
<div className={theme.root}>
  <button
    className={cx(theme.item, !items.find(i => i.get('selected')) && theme.active)}
    onClick={facet.resetValues}>
    All categories ({ total })
  </button>
  <MapArray
    config={config}
    array={items}
    factory={Item}
    theme={theme} />
</div>

