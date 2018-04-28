import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import Query from 'components/search/Query';
import Sorting from 'components/Sorting';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

export default ({ showFacets, theme, facetsVisible, config }) =>
<div className={theme.root}>
  <div className={theme.block}>
    <Button
      display-if={config.get('hidableFacets') && !facetsVisible}
      className={theme.showFacets}
      onClick={showFacets}>
      <Text secondary uppercase>
        <Icon name='Filters' className={theme.icon} />
        { config.getIn(['facets', 'i18n', 'hide'], 'show') }
      </Text>
    </Button>
    <Query theme={{ root: theme.query }} />
    <Breadcrumbs theme={{ root: theme.breadcrumbs }} />
  </div>
  <div className={theme.sorting}>
    <Sorting />
  </div>
</div>
