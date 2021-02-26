/**
 * @module components/search/DesktopActions
 */

import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import Query from 'components/search/Query';
import Sorting from 'components/Sorting';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { ThemedSFCProps, MJSConfiguration } from 'types';
import Grid from 'components/common/Grid';

/** Props that DesktopActions view accepts */
export interface IDesktopActionsProps extends ThemedSFCProps {
  /** Method to show facets */
  showFacets: () => any;
  /** Flag to indicate whether facets are visible */
  facetsVisible: boolean;
  /** Flag to indicate if we're in Smart Collection mode */
  isCollection: boolean;
  /** MJS Configuration */
  config: MJSConfiguration
}

const DesktopActionsView: React.FunctionComponent<IDesktopActionsProps> = ({
  showFacets,
  theme,
  facetsVisible,
  isCollection,
  config
}: IDesktopActionsProps) => (
  <Grid className={theme.root} columns='auto|fit'>
    <div columnClass={theme.block} className={theme.blockInner}>
      <Button
        display-if={config.get('hidableFacets') && !facetsVisible}
        className={theme.showFacets}
        onClick={showFacets}
      >
        <Text secondary uppercase>
          <Icon name='Filters' className={theme.icon} />
          { config.getIn(['facets', 'i18n', 'showDesktopFacets'], 'show') }
        </Text>
      </Button>
      <Query display-if={!isCollection} theme={{ root: theme.query }} />
      <Breadcrumbs theme={{ root: theme.breadcrumbs }} />
    </div>
    <Sorting columnClass={theme.sorting} />
  </Grid>
)

export default DesktopActionsView;
