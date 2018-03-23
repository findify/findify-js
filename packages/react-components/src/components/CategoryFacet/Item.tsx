import React from 'react';
import MapArray from 'components/common/MapArray';
import content from 'components/CategoryFacet/content';

const Item = ({ item, theme, style, config }) => 
<>
  <button style={style} className={theme.item} onClick={item.toggle}>
    { content({ item }) }
  </button>
  <div display-if={item.get('children')} className={theme.nested}>
    <MapArray
      config={config}
      array={item.get('children')}
      factory={Item}
      theme={theme} />
  </div>
</>

export default Item;
