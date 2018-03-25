import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import Query from 'components/search/Query';
import Sorting from 'components/Sorting';

export default ({ showFacets, theme }) =>
<div className={theme.root}>
  <Query />
  <Breadcrumbs />
  <Sorting />
</div>
