import React from 'react';

import MapArray from 'components/common/MapArray';
import Item from 'components/ColorFacet/Item';

export default ({
  theme,
  items,
  config,
}) => 
<>
  <MapArray
    config={config}
    array={items}
    factory={Item}
    theme={theme} />
</>

