import React from 'react';
import Downshift from 'downshift';
import MapArray from 'components/common/MapArray';
import Icon from 'components/Icon';

const Item = ({ item, index, getItemProps, highlighted, active }) => (
  <button display-if={!active.equals(item)} {...getItemProps({ item })}>
    { item.get('label') }
  </button>
);

export default ({ sort, onChangeSort, config, theme, items }) =>
<Downshift
  onChange={onChangeSort}
  defaultSelectedItem={items.get(0)}
  itemToString={i => i.get('label')}>
{
  ({ isOpen, selectedItem, getToggleButtonProps, getItemProps, highlightedIndex }) => (
    <div className={theme.root}>
      <button {...getToggleButtonProps()}>
        { selectedItem.get('label') }
        <Icon name='arrow' />
      </button>
      <MapArray
        active={selectedItem}
        theme={theme}
        display-if={isOpen}
        highlighted={highlightedIndex}
        getItemProps={getItemProps}
        array={items}
        factory={Item} />
    </div>
  )
}
</Downshift>
