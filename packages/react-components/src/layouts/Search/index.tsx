/**
 * @module layouts/Search
 */

import { useEffect } from 'react';
import StaticResults from 'components/search/StaticResults';
import LazyResults from 'components/search/LazyResults';
import DesktopFacets from 'components/search/DesktopFacets';
import MobileActions from 'components/search/MobileActions';
import DesktopActions from 'components/search/DesktopActions';
import Branch from 'components/common/Branch';
import Banner from 'components/Banner';
import { List } from 'immutable';
import Grid, { Column } from 'components/common/Grid';
import { useMobile } from 'helpers/useMobile';
import { useAnnouncement } from 'components/common/Announcement';
import useScrollOnChange from 'helpers/useScrollOnChange';
import { useItems } from '@findify/react-connect';
import useTranslations from 'helpers/useTranslations';

import styles from 'layouts/Search/styles.css';
import { Immutable } from '@findify/store-configuration';
import { ThemedSFCProps, IProduct } from 'types';
import SearchResultsLayout from 'components/search/SearchResultsLayout';

/** Props that search layout accepts */
export interface ISearchProps extends ThemedSFCProps<typeof styles> {
  isCollection?: boolean;
  /** Items list */
  items: List<IProduct>;
}

const Search = ({ isCollection, theme = styles }) => {
  const { items, config } = useItems<Immutable.SearchConfig>();
  const translate = useTranslations();
  const isMobile = useMobile();
  const [announcement, setAnnouncement] = useAnnouncement();

  useScrollOnChange(items);

  useEffect(() => setAnnouncement(translate('search.accessibleUpdate')), [
    items,
  ]);

  if (!items.size) return null;
  return (
    <>
      <Grid
        className={theme.root}
        gutter={40}
        columns={
          config.getIn(['facets', 'position']) === 'top'
            ? 'full'
            : config.getIn(['breakpoints', 'layout'], 'fit|auto')
        }
      >
        <Column
          display-if={!isMobile}
          order={config.getIn(['facets', 'position']) === 'right' && 2}
        >
          <DesktopFacets />
        </Column>
        <>
          <Branch
            isCollection={isCollection}
            condition={isMobile}
            left={MobileActions}
            right={DesktopActions}
          />
          <Banner />
          {/* <Branch
            condition={config.getIn(['pagination', 'type']) === 'lazy'}
            left={LazyResults}
            right={StaticResults}
          /> */}
          <SearchResultsLayout condition={config.getIn(['pagination', 'type'])} />
        </>
      </Grid>
      {announcement}
    </>
  );
};

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Search)
  : Search;
