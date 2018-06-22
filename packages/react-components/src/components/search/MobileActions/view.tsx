/**
 * @module components/search/MobileActions
 */

import React from 'react';
import { List } from 'immutable'
import Query from 'components/search/Query';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

import { MJSConfiguration, ThemedSFCProps, IFacet } from 'types';

/** Props that MobileActionsView accepts */
export interface IMobileActionsProps extends ThemedSFCProps {
  /** Flag, showing whether smart collection or regular searches are opened */
  isCollection?: boolean
  /** Facets currently applied */
  facets: List<IFacet>;
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
  isCollection,
  showFacets,
  facets,
  showSort,
  theme,
  config,
  sorting
}: IMobileActionsProps) =>
<div className={theme.root}>
  <Query display-if={!isCollection} theme={{root: theme.query}} />

  <div className={theme.bottomRow}>
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
        <span className={theme.facetCount}>
          ({facets.size})
        </span>
      </Text>
    </Button>
  </div>
</div>

export default MobileActionsView;
