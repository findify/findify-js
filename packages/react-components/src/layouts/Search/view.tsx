import React from 'react';
import Grid from 'components/common/Grid';
import StaticResults from 'components/search/StaticResults';
import LazyResults from 'components/search/LazyResults';
import MobileFacets from 'components/search/MobileFacets';
import DesktopFacets from 'components/search/DesktopFacets';
import Branch from 'components/helpers/Branch';

export default ({ config, isMobile, mobileFacetsOpened }) =>
<>
  <MobileFacets display-if={isMobile} />
  <Branch left={Grid} condition={!isMobile} columns='3|9'>
    <DesktopFacets display-if={!isMobile && !config.getIn(['view', 'filtersOnRight'])} />
    <Branch left={LazyResults} right={StaticResults} condition={config.getIn(['view', 'lazy'])} />
    <DesktopFacets display-if={!isMobile && config.getIn(['view', 'filtersOnRight'])} />
  </Branch>
</>

