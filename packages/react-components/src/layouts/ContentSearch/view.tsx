/**
 * @module layouts/ContentSearch
 */

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

import { IProduct, MJSConfiguration, MJSValue, ThemedSFCProps } from 'types/index';
import { List, Map } from 'immutable';

/** This is a list of props ContentSearchLayout accepts */
interface IContentSearchProps extends ThemedSFCProps {
  /** MJS configuration */
  config: MJSConfiguration;
  /** MJS Request meta-information, like query, offset, limits */
  meta: Map<string, MJSValue>;
  /** Flag that tells ContentSearchView to render in mobile mode */
  isMobile?: boolean;
  /** Flag to tell that mobile facets should be rendered */
  mobileFacetsOpened?: boolean;
  /** Flag to pull filters to the right on desktop */
  filtersOnRight?: boolean;
}


const ContentSearchLayout = ({
  config,
  meta,
  isMobile,
  mobileFacetsOpened,
  filtersOnRight,
  theme
}: IContentSearchProps) => (
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

export default ContentSearchLayout;
