import React from 'react';
import ItemsList from 'components/ItemsList';
import Grid from 'components/common/Grid';
import PoweredBy from 'components/PoweredBy';
import Pagination from 'components/Pagination';

export default ({ columns }) =>
<>
  <ItemsList wrapper={Grid} columns={columns}/>
  <Pagination />
  <PoweredBy />
</>
