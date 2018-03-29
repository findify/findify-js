import React from 'react';
import Grid from 'components/common/Grid';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

export default ({ showFacets, showSorting, theme, config, sorting }) =>
<div className={theme.root}>

  <Button onClick={showSorting} className={theme.button}>
    <Text primary uppercase>
      <Icon name='Sorting' />
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
