import React from 'react';
import Grid from 'components/common/Grid';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

export default ({ showFacets, showSort, theme, config, sorting }) =>
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
