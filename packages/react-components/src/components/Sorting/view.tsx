import React from 'react';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Dropdown from 'components/Dropdown';

export default ({ sort, onChangeSort, config, theme, items, selectedItem }) =>
<div className={theme.root}>
  <Icon name='Sorting' className={theme.icon} />
  <Text primary uppercase className={theme.title}>
    { config.getIn(['sorting', 'i18n', 'title']) }:
  </Text>
  <Dropdown
    theme={{ root: theme.dropdown }}
    items={items}
    onChange={onChangeSort}
    selectedItem={selectedItem} />
</div>
