/**
 * @module components/search/MobileActions
 */
import { compose } from 'recompose';
import { withDrawer } from 'helpers/withDrawer';
import MobileFacets from 'components/search/MobileFacets';
import MobileSorting from 'components/search/MobileSorting';
import Query from 'components/search/Query';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

import { ThemedSFCProps } from 'types';
import { useQuery, useSort } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';
import { memo, useMemo } from 'react';
import { emit, useEvents } from 'helpers/emmiter';
import styles from 'components/search/MobileActions/styles.css';
import useSortingLogic from 'helpers/useSortingLogic';

/** Props that MobileActionsView accepts */
export interface IMobileActionsProps extends ThemedSFCProps {
  /** Flag, showing whether smart collection or regular searches are opened */
  isCollection?: boolean;
  showModal: (name: string) => void;
  hideModal: (name: string) => void;
}

const showFacets = () => emit('showMobileFacets');
const showSort = () => emit('showMobileSort');

const MobileActions = memo(
  ({
    isCollection,
    theme = styles,
    showModal,
    hideModal,
  }: IMobileActionsProps) => {
    const [sortItems, currentSort] = useSortingLogic();
    const { query } = useQuery();
    const translate = useTranslations();

    useEvents({
      showMobileFacets: () => showModal('Filters'),
      showMobileSort: () => showModal('Sorting'),
      hideMobileFacets: () => hideModal('Filters'),
      hideMobileSort: () => hideModal('Sorting'),
    });

    const total = useMemo(
      () =>
        query.get('filters')
          ? query
              .get('filters')
              .reduce(
                (acc, filter) =>
                  acc +
                  (/category[2-9]/.test(filter.get('name'))
                    ? 0
                    : filter.get('values').size),
                0
              )
          : 0,
      [query]
    );

    return (
      <div className={theme.root}>
        <Query display-if={!isCollection} theme={{ root: theme.query }} />

        <div className={theme.bottomRow}>
          <Button onClick={showSort} className={theme.button}>
            <Text primary uppercase>
              <Icon name="Sorting" title="Sorting" className={theme.icon} />
              {currentSort.get('label')}
            </Text>
          </Button>

          <div className={theme.divider} />

          <Button onClick={showFacets} className={theme.button}>
            <Text primary uppercase>
              <Icon name="Filters" title="Filters" />
              {translate('actions.filter')}
              <span className={theme.facetCount}>({total})</span>
            </Text>
          </Button>
        </div>
      </div>
    );
  }
);

const transform = {
  from: { transform: `translate3d(-100%, 0, 0)` },
  to: { transform: `translate3d(0%, 0, 0)` },
};

export default compose(
  withDrawer('Filters', MobileFacets, transform),
  withDrawer('Sorting', MobileSorting, transform)
)(MobileActions);
