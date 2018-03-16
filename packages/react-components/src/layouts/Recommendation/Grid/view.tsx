import React from 'react';

import Grid from 'components/common/Grid';
import ItemsList from 'components/ItemsList';
import Title from 'components/Title';

export default ({ items, config, theme }) =>
<>
  <Title>{ config.get('title') }</Title>
  <ItemsList wrapper={Grid} columns='3' />
</>
