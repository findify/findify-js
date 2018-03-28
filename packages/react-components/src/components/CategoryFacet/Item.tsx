import React from 'react';
import cx from 'classnames';
import MapArray from 'components/common/MapArray';
import content from 'components/CategoryFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';

const Item = ({ item, theme, style, config }) => 
<>
  <Button
    style={style}
    className={theme.item}
    onClick={item.toggle}>
    <Text primary lowercase bold={item.get('selected')}>
      { content({ item }) }
    </Text>
  </Button>
  <div display-if={item.get('children')} className={theme.nested}>
    <MapArray
      config={config}
      array={item.get('children')}
      factory={Item}
      theme={theme} />
  </div>
</>

export default Item;
