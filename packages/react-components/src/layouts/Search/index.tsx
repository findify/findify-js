/**
 * @module layouts/Search
 */

import { useItems } from '@findify/react-connect';
import Banner from 'components/Banner';
import { useAnnouncement } from 'components/common/Announcement';
import Branch from 'components/common/Branch';
import Grid, { Column } from 'components/common/Grid';
import DesktopActions from 'components/search/DesktopActions';
import DesktopFacets from 'components/search/DesktopFacets';
import MobileActions from 'components/search/MobileActions';
import { useMobile } from 'helpers/useMobile';
import useScrollOnChange from 'helpers/useScrollOnChange';
import useTranslations from 'helpers/useTranslations';
import { List } from 'immutable';
import { useEffect } from 'react';

import { Immutable } from '@findify/store-configuration';
import SearchResultsLayout from 'components/search/SearchResultsLayout';
import { hideLoader } from 'helpers/loader';
import styles from 'layouts/Search/styles.css';
import { IProduct, ThemedSFCProps } from 'types';

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
  hideLoader();
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
