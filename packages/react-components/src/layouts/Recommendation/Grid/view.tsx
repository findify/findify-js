import React from 'react';

import ItemsList from '../../../components/ItemsList';
import Title from '../../../components/Title';

export default ({ config }) =>
<>
  <Title>{ config.get('title') }</Title>
  <ItemsList />
</>
