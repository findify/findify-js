import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import Query from 'components/search/Query';
import Sorting from 'components/Sorting';

export default ({ showFacets, theme }) =>
<div className={theme.root}>
  <div className={theme.block}>
    <Query theme={{ root: theme.query }} />
    <Breadcrumbs theme={{ root: theme.breadcrumbs }} />
  </div>
  <div className={theme.sorting}>
    <Sorting />
  </div>
</div>
