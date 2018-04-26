import React from 'react';
import cx from 'classnames';

import MapArray from 'components/common/MapArray';
import Item from 'components/CategoryFacet/Item';
import Button from 'components/Button';
import Text from 'components/Text';

export default ({
  theme,
  items,
  config,
  facet,
  total
}) => 
<div className={theme.root}>
  <Button
    className={theme.item}
    onClick={facet.resetValues}>
    <Text lowercase primary bold={!items.find(i => i.get('selected'))}>
       All categories
    </Text>
    <Text secondary uppercase>
      ({ total })
    </Text>
  </Button>
  <MapArray
    config={config}
    array={items}
    factory={Item}
    theme={theme} />
</div>

