import React from 'react';
import Grid from 'components/common/Grid';
import StaticResults from 'components/search/StaticResults';
import LazyResults from 'components/search/LazyResults';
import MobileFacets from 'components/search/MobileFacets';
import DesktopFacets from 'components/search/DesktopFacets';
import MobileActions from 'components/search/MobileActions';
import MobileSorting from 'components/search/MobileSorting';
import DesktopActions from 'components/search/DesktopActions';
import Branch from 'components/common/Branch';

export default ({ config, meta, isMobile, mobileFacetsOpened, filtersOnRight, theme }) =>
<div className={theme.root}>
  <DesktopFacets display-if={!isMobile && !filtersOnRight} />
  <div className={theme.content}>
    <Branch condition={isMobile} left={MobileActions} right={DesktopActions} />
    <Branch left={LazyResults} right={StaticResults} condition={config.getIn(['view', 'infinite'])} />
  </div>
  <DesktopFacets display-if={!isMobile && filtersOnRight} />
  {/* <MobileFacets /> */}
  {/* <MobileSorting /> */}
</div>

