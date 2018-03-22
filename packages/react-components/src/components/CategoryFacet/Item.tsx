import React from 'react';
import MapArray from 'components/common/MapArray';

const Item = ({ item, theme, style, config }) => {
  console.log(item.toJS());
  
  return <>
    <button style={style} className={theme.item} onClick={item.toggle}>
      { item.get('value') }
    </button>
    <div display-if={item.get('children')} className={theme.nested}>
      <MapArray
        config={config}
        array={item.get('children')}
        factory={Item}
        theme={theme} />
    </div>
  </>
}

export default Item;
