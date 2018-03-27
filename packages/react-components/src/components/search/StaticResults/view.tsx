import React from 'react';
import ItemsList from 'components/ItemsList';
import Grid from 'components/common/Grid';
import PoweredBy from 'components/PoweredBy';
import Pagination from 'components/Pagination';

export default ({ columns, theme }) =>
<div className={theme.root}>
  <ItemsList wrapper={Grid} columns={columns}/>
  <Pagination />
  <PoweredBy />
</div>
