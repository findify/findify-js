import React from 'react';
import { withHandlers } from 'recompose';
import Branch from 'components/common/Branch';
import MapArray from 'components/common/MapArray';
import FacetTitles from 'components/search/MobileFacets/Titles';

const FacetContent = ({ theme }) => (
  <div className={theme.content}></div>
);

export default ({ theme, facets, activeFacet, selectFacet, config }) =>
<div className={theme.root}>
  <div className={theme.header}>

  </div>
  <div className={theme.body}>
    <Branch
      config={config}
      selectFacet={selectFacet}
      theme={theme}
      active={activeFacet}
      facets={facets}
      condition={!!activeFacet}
      right={FacetTitles}
      left={FacetContent} />
  </div>
  <div className={theme.footer}></div>
</div>
