import cx from 'classnames'
import React from 'react';
import Grid from 'components/common/Grid';
import StaticResults from 'components/search/StaticResults';
import LazyResults from 'components/search/LazyResults';
import DesktopFacets from 'components/search/DesktopFacets';
import MobileActions from 'components/search/MobileActions';
import DesktopActions from 'components/search/DesktopActions';
import Branch from 'components/common/Branch';
import Banner from 'components/Banner';

export default ({ config, meta, isMobile, mobileFacetsOpened, filtersOnRight, theme, items }) =>
  <div className={theme.root}>
    <DesktopFacets display-if={!isMobile && !filtersOnRight} />
    <div className={theme.content}>
      <Branch condition={isMobile} left={MobileActions} right={DesktopActions} />
      <Banner />
      <Branch left={LazyResults} right={StaticResults} condition={config.getIn(['view', 'infinite'])} />
    </div>
    <DesktopFacets display-if={!isMobile && filtersOnRight} />
  </div>


