import React from 'react';

import MapArray from 'components/common/MapArray';
import Item from 'components/CategoryFacet/Item';

export default ({
  theme,
  items,
  config,
  facet,
  total
}) => 
<>
  <button onClick={facet.resetValues}>
    All categories ({ total })
  </button>
  <MapArray
    config={config}
    array={items}
    factory={Item}
    theme={theme} />
</>

