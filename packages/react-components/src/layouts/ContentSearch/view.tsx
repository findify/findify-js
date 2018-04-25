import cx from 'classnames'
import React from 'react';
import { sample } from 'lodash'
import Grid from 'components/common/Grid';
import StaticResults from 'components/search/StaticResults';
import LazyResults from 'components/search/LazyResults';
import DesktopFacets from 'components/search/DesktopFacets';
import MobileActions from 'components/search/MobileActions';
import DesktopActions from 'components/search/DesktopActions';
import Branch from 'components/common/Branch';
import LazyContentSearchResults from 'components/contentsearch/LazyContentSearchResults'
import Trends from 'components/contentsearch/Trends'
import { Tabs, Tab } from 'components/Tabs';
import { fromJS } from 'immutable'


export default ({ config, meta, isMobile, mobileFacetsOpened, filtersOnRight, theme }) => (
  <Tabs>
    <Tab label='All content' disabled>
      <h1>Content Search is coming soon...</h1>
    </Tab>
    <Tab label='Products'>
      <div className={theme.root}>
        <DesktopFacets display-if={!isMobile && !filtersOnRight} />
        <div className={theme.content}>
          <Branch condition={isMobile} left={MobileActions} right={DesktopActions} />
          <Branch left={LazyResults} right={StaticResults} condition={config.getIn(['view', 'infinite'])} />
        </div>
        <DesktopFacets display-if={!isMobile && filtersOnRight} />
      </div>
    </Tab>
    <Tab label='Trendspotting'>
      <div className={theme.root}>
        <div className={theme.content}>
          <Trends text={'#sleeves'} />
          <LazyContentSearchResults config={config} />
        </div>
      </div>
    </Tab>
  </Tabs>
)


