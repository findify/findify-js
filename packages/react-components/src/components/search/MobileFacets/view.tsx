import React from 'react';
import { withHandlers } from 'recompose';
import Branch from 'components/common/Branch';
import MapArray from 'components/common/MapArray';
import FacetTitles from 'components/search/MobileFacets/Titles';
import Component from 'components/Facet/Component';
import cx from 'classnames';

const FacetContent = ({ active, config, theme }) => (
  <div className={theme.container}>
    <Component type={active.get('type')} facet={active} config={config} />
  </div>
);

export default ({ theme, facets, activeFacet, selectFacet, config }) =>
<div className={cx(theme.root, 'mobile')}>
  <div className={theme.header}>

  </div>
  <div className={theme.body}>
    <Branch
      config={config}
      theme={theme}
      selectFacet={selectFacet}
      active={activeFacet}
      facets={facets}
      condition={!!activeFacet}
      right={FacetTitles}
      left={FacetContent} />
  </div>
  <div className={theme.footer}></div>
</div>
