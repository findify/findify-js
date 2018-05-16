/**
 * @module components/search/MobileActions
 */

import React from 'react';
import Grid from 'components/common/Grid';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { MJSConfiguration, ThemedSFCProps } from 'types/index';

/** Props that MobileActionsView accepts */
interface IMobileActionsProps extends ThemedSFCProps {
  /** Flag whether to show facets selection */
  showFacets?: boolean;
  /** Flag whether to show sorting */
  showSort?: boolean
  /** MJS Configuration */
  config: MJSConfiguration
  /** Current sorting mode */
  sorting: string;
}



const MobileActionsView: React.SFC<IMobileActionsProps> =  ({
  showFacets,
  showSort,
  theme,
  config,
  sorting
}: IMobileActionsProps) =>
<div className={theme.root}>

  <Button onClick={showSort} className={theme.button}>
    <Text primary uppercase>
      <Icon name='Sorting' className={theme.icon} />
      { sorting }
    </Text>
  </Button>

  <div className={theme.divider} />

  <Button onClick={showFacets} className={theme.button}>
    <Text primary uppercase>
      <Icon name='Filters' />
      { config.getIn(['facets', 'i18n', 'showMobileFacets'], 'Filter') }
    </Text>
  </Button>

</div>

export default MobileActionsView;
