import React from 'react';
import Grid from 'components/common/Grid';
import StaticResults from 'components/search/StaticResults';
import LazyResults from 'components/search/LazyResults';
import MobileFacets from 'components/search/MobileFacets';
import DesktopFacets from 'components/search/DesktopFacets';
import MobileActions from 'components/search/MobileActions';
import DesktopActions from 'components/search/DesktopActions';
import Branch from 'components/common/Branch';

export default ({ config, isMobile, mobileFacetsOpened, filtersOnRight }) =>
<>

  <Branch left={Grid} condition={!isMobile} columns={filtersOnRight ? '9|3' : '3|9'}>
    <DesktopFacets display-if={!isMobile && !filtersOnRight} />
    <>
      <MobileActions display-if={isMobile} />
      <DesktopActions display-if={!isMobile} />
      <Branch left={LazyResults} right={StaticResults} condition={config.getIn(['view', 'lazy'])} />
    </>
    <DesktopFacets display-if={!isMobile && filtersOnRight} />
  </Branch>

  <MobileFacets display-if={isMobile} />
</>

