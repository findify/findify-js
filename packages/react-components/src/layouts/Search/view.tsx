/**
 * @module layouts/Search
 */
import React from 'react';
import StaticResults from 'components/search/StaticResults';
import LazyResults from 'components/search/LazyResults';
import DesktopFacets from 'components/search/DesktopFacets';
import MobileActions from 'components/search/MobileActions';
import DesktopActions from 'components/search/DesktopActions';
import Branch from 'components/common/Branch';
import Banner from 'components/Banner';
import { List } from 'immutable'
import { MJSConfiguration, ThemedSFCProps, IProduct } from 'types';
import Grid from 'components/common/Grid';
import { useMobile } from 'helpers/withMobile';

/** Props that search layout accepts */
export interface ISearchProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Flag that switches Search to mobile layout */
  isMobile?: boolean;
  /** Flag to turn on Smart Collection display mode */
  isCollection?: boolean;
  /** Flag to render mobile facets */
  mobileFacetsOpened?: boolean;
  /** Flag to show filters on the right side of desktop search */
  filtersOnRight?: boolean;
  /** Items list */
  items: List<IProduct>;
}

const SearchLayout = ({ config, isCollection, theme }) => {
  const isMobile = useMobile();
  return (
    <Grid className={theme.root} columns='fit|auto' gutter={40}>
      <DesktopFacets
        display-if={!isMobile}
        order={config.get('filtersOnRight') && 2}
      />
      <>
        <Branch
          isCollection={isCollection}
          condition={isMobile}
          left={MobileActions}
          right={DesktopActions}
        />
        <Banner />
        <Branch
          condition={config.getIn(['view', 'infinite'])}
          left={LazyResults}
          right={StaticResults}
        />
      </>
    </Grid>
  )
}


export default SearchLayout;
