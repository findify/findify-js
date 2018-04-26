import React from 'react';
import content from 'components/CheckboxFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

export default ({ item, theme, style, onItemClick }) =>
  <Button style={style} className={theme.item} onClick={(evt) => {
    item.toggle(evt)
    onItemClick && onItemClick(evt);
  }}>
    <Icon name={item.get('selected') ? 'CheckboxFilled' : 'CheckboxEmpty'} />
    <Text primary lowercase bold={item.get('selected')}>
      { content({ item }) }
    </Text>
    <Text secondary uppercase>
      ({item.get('count')})
    </Text>
  </Button>
