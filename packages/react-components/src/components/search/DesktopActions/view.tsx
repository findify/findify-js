import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import Query from 'components/search/Query';

export default ({ showFacets, theme }) =>
<div className={theme.root}>
  <Query />
  <Breadcrumbs />
</div>
