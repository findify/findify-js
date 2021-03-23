/**
 * @module components/search/DesktopActions
 */
import { useCallback, useState } from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import Query from 'components/search/Query';
import Sorting from 'components/Sorting';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { ThemedSFCProps } from 'types';
import Grid, { Column } from 'components/common/Grid';

import useTranslations from 'helpers/useTranslations';
import { emit, useEvents } from 'helpers/emmiter';

import styles from 'components/search/DesktopActions/styles.css';

/** Props that DesktopActions view accepts */
export interface IDesktopActionsProps extends ThemedSFCProps {
  isCollection: boolean;
}

const useFacetsLogic = () => {
  const [visible, setVisible] = useState(true);
  useEvents({
    hideFacets: () => setVisible(false),
  });
  const showFacets = useCallback(() => {
    setVisible(true);
    emit('showFacets');
  }, []);
  return [visible, showFacets];
};

export default ({ theme = styles, isCollection }: IDesktopActionsProps) => {
  const t = useTranslations();
  const [facetsVisible, showFacets] = useFacetsLogic();
  return (
    <Grid className={theme.root} columns="auto|fit">
      <Column className={theme.block}>
        <div className={theme.blockInner}>
          <Button
            display-if={!facetsVisible}
            className={theme.showFacets}
            onClick={showFacets}
          >
            <Text secondary uppercase>
              <Icon name="Filters" title="Filters" className={theme.icon} />
              {t('show')}
            </Text>
          </Button>
          <Query display-if={!isCollection} />
          <Breadcrumbs />
        </div>
      </Column>
      <Column className={theme.sorting}>
        <Sorting />
      </Column>
    </Grid>
  );
};
