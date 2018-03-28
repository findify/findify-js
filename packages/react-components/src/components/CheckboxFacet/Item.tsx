import React from 'react';
import content from 'components/CheckboxFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';

export default ({ item, theme, style }) =>
  <Button style={style} className={theme.item} onClick={item.toggle}>
    <Text primary lowercase bold={item.get('selected')}>
      { content({ item }) }
    </Text>
  </Button>
