import React from 'react';

import ItemCard from 'components/ItemCard';
import Grid from 'components/helpers/Grid';
import MapArray from 'components/helpers/MapArray';
import Title from 'components/Title';

export default ({ items, config, theme }) =>
<>
  <Title>{ config.get('title') }</Title>
  <Grid columns={String(1/12)}>
    <MapArray array={items} factory={ItemCard} />
  </Grid>
</>
