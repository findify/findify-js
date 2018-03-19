import React from 'react';

import Grid from 'components/common/Grid';
import ItemsList from 'components/ItemsList';
import Title from 'components/Title';

export default ({ items, title, theme }) =>
<>
  <Title>{ title }</Title>
  <ItemsList wrapper={Grid} columns='3' />
</>
