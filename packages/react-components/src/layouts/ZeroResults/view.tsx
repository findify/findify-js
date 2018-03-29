import React from 'react';

import Grid from 'components/common/Grid';
import ItemsList from 'components/ItemsList';
import Text from 'components/Text';

export default ({ items, title, theme, config }) =>
<>
  <Text primary lowercase html={title} />
  <ItemsList wrapper={Grid} columns='3' />
</>
