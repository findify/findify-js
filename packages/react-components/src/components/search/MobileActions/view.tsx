import React from 'react';
import Grid from 'components/common/Grid';

export default ({ showFacets, theme }) =>
<Grid columns='6'>
  <button onClick={showFacets}>Show facets</button>
</Grid>
