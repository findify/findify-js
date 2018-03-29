import React from 'react';

import Grid from 'components/common/Grid';
import ItemsList from 'components/ItemsList';
import Text from 'components/Text';

export default ({ items, config, theme }) =>
<>
  <Text primary lowercase>{ config.get('title') }</Text>
  <ItemsList wrapper={Grid} columns='3' />
</>
