import React from 'react';

import ItemCard from 'components/ItemCard';
import Grid from 'components/common/Grid';
import mapArray from 'components/common/MapArray';
import Title from 'components/Title';

export default ({ items, config, theme }) =>
<>
  <Title>{ config.get('title') }</Title>
  <Grid columns='3'>
    { mapArray({ array: items, factory: ItemCard }) }
  </Grid>
</>
