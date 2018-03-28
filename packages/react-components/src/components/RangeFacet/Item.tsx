import React from 'react';
import content from 'components/RangeFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';

export default ({ item, theme, style, config }) =>
<Button style={style} className={theme.item} onClick={item.toggle}>
  <Text primary lowercase bold={item.get('selected')}>
  { content({ item, config }) }
  </Text>
</Button>
