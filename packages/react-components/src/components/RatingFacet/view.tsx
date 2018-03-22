import React from 'react';
import cx from 'classnames';

import MapArray from 'components/common/MapArray';
import Item from 'components/RangeFacet/Item';

export default ({
  theme,
  facet,
  items,
  config,
}) =>
<>
  <MapArray
    display-if={config.get('pullSelected')}
    array={config.get('pullSelected') ? items.filter(i => i.get('selected')) : items}
    factory={Item}
    config={config}
    theme={theme} />

  <MapArray
    array={config.get('pullSelected') ? items.filter(i => !i.get('selected')) : items}
    factory={Item}
    config={config}
    theme={theme} />
</>

