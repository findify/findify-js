/**
 * @module components/Sorting
 */

import React from 'react';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Dropdown from 'components/Dropdown';
import { MJSConfiguration, ISortingItem, ThemedSFCProps } from 'types';
import { List } from 'immutable';

/** List of props Sorting view accepts */
interface ISortingProps extends ThemedSFCProps {
  /** Callback called when sorting is changed */
  onChangeSort?: (value: any) => void
  /** MJS configuration */
  config: MJSConfiguration;
  /** List of Sorting configurations */
  items: List<ISortingItem>;
  /** Current selected sorting configuration */
  selectedItem: ISortingItem;
}

const Sorting = ({ onChangeSort, config, theme, items, selectedItem }: ISortingProps) =>
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

export default Sorting;
