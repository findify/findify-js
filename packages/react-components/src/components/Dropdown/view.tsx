/**
 * @module components/Dropdown
 */

import React from 'react';
import cx from 'classnames';
import Downshift from 'downshift';
import MapArray from 'components/common/MapArray';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Text from 'components/Text';
import { MJSValue, ThemedSFCProps, ClassnamedProps } from 'types';
import { List, Map } from 'immutable'

/** Props that Dropdown Item accepts */
export interface IDropdownItemProps extends ThemedSFCProps {
  /** Item can be basically any immutable.Map(), that has 'label' attribute */
  item: Map<string, MJSValue>
  /** Index is item's current index in array of elements */
  index: number;
  /** Current highlighted index */
  highlighted: number;
  /** getItemProps is a method passed down to receive additional props for item from Downshift */
  getItemProps: (item: { item: Map<string, MJSValue> }) => { [x: string]: any };
}

const Item = ({ item, index, getItemProps, highlighted, theme }: IDropdownItemProps) => (
  <Button
    className={cx(theme.option, highlighted === index && theme.highlighted)}
    {...getItemProps({ item })}>
    <Text primary lowercase>
      { item.get('label') }
    </Text>
  </Button>
);

/** Props that Dropdown accepts */
export interface IDropdownProps extends ClassnamedProps, ThemedSFCProps {
  /** onChange function for Downshift */
  onChange: (x: any) => any
  /** List of items */
  items: List<Map<string, MJSValue>>
  /** Currently active item */
  selectedItem: Map<string, MJSValue>
}

const DropdownView = ({ onChange, items, selectedItem, theme, className }: IDropdownProps) =>
<Downshift
  onChange={onChange}
  selectedItem={selectedItem || items.get(0)}
  itemToString={i => i.get('label')}>
  {
    ({ isOpen, selectedItem, getToggleButtonProps, getItemProps, highlightedIndex }) => (
      <div className={cx(theme.root, className)}>
        <Button {...getToggleButtonProps()} className={theme.select}>
          <Text primary lowercase>
            { selectedItem.get('label') }
          </Text>
          <Icon name='ArrowDown' className={theme.arrow}/>
        </Button>
        <div className={cx(theme.dropdown, { [theme.open]: isOpen })} >
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

export default DropdownView;
