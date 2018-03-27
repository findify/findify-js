import React from 'react';
import cx from 'classnames';
import Downshift from 'downshift';
import MapArray from 'components/common/MapArray';
import Icon from 'components/Icon';

const Item = ({ item, index, getItemProps, highlighted, theme }) => (
  <button
    className={cx(theme.option, highlighted === index && theme.highlighted)}
    {...getItemProps({ item })}>
    { item.get('label') }
  </button>
);

export default ({ sort, onChangeSort, config, theme, items, selectedItem }) =>
<Downshift
  onChange={onChangeSort}
  selectedItem={selectedItem || items.get(0)}
  itemToString={i => i.get('label')}>
{
  ({ isOpen, selectedItem, getToggleButtonProps, getItemProps, highlightedIndex }) => (
    <div className={theme.root}>
      <button {...getToggleButtonProps()} className={theme.select}>
        { selectedItem.get('label') }
        <Icon name='arrow' className={theme.arrow}/>
      </button>
      <div className={theme.dropdown} display-if={isOpen}>
        <MapArray
          theme={theme}
          highlighted={highlightedIndex}
          getItemProps={getItemProps}
          array={items.filter(i => !i.equals(selectedItem))}
          factory={Item} />
      </div>
    </div>
  )
}
</Downshift>
