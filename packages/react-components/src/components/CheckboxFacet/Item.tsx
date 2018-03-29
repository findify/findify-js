import React from 'react';
import content from 'components/CheckboxFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

export default ({ item, theme, style }) =>
  <Button style={style} className={theme.item} onClick={item.toggle}>
    <Text primary lowercase bold={item.get('selected')}>
      <Icon name={item.get('selected') ? 'CheckboxFilled' : 'CheckboxEmpty'} />
      { content({ item }) }
    </Text>
    <Text secondary uppercase>
      ({item.get('count')})
    </Text>
  </Button>
