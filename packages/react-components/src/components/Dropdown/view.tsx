/**
 * @module components/Dropdown
 */

import cx from 'classnames';
import Downshift from 'downshift';
import MapArray from 'components/common/MapArray';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Text from 'components/Text';
import { MJSValue, ThemedSFCProps, ClassnamedProps } from 'types';
import { fromJS, isImmutable, List, Map } from 'immutable';
import styles from 'components/Dropdown/styles.css';
import { useMemo, useRef } from 'react';

/** Props that Dropdown Item accepts */
export interface IDropdownItemProps extends ThemedSFCProps {
  /** Item can be basically any immutable.Map(), that has 'label' attribute */
  item: Map<string, MJSValue>;
  /** Index is item's current index in array of elements */
  index: number;
  /** Current highlighted index */
  highlighted: number;
  /** getItemProps is a method passed down to receive additional props for item from Downshift */
  getItemProps: (item: { item: Map<string, MJSValue> }) => { [x: string]: any };

  parentId: string;
}

const Item = ({
  item,
  index,
  getItemProps,
  highlighted,
  theme = styles,
}: IDropdownItemProps) => (
  <li
    className={cx(theme.option, highlighted === index && theme.highlighted)}
    {...getItemProps({ item })}
  >
    <Text primary lowercase>
      {item.get('label')}
    </Text>
  </li>
);

/** Props that Dropdown accepts */
export interface IDropdownProps extends ClassnamedProps, ThemedSFCProps {
  /** onChange function for Downshift */
  onChange: (x: any) => any;
  /** List of items */
  items: List<Map<string, MJSValue>>;
  /** Currently active item */
  selectedItem: Map<string, MJSValue>;

  itemToString?: any;
}

export default ({
  onChange,
  selectedItem,
  className,
  items: _items,
  theme = styles,
  itemToString = (i) => i.get('label'),
}: IDropdownProps) => {
  const items = useMemo(() => (isImmutable(_items) ? _items : fromJS(_items)), [
    _items,
  ]);
  const id = useRef(`dropdown-${items.hashCode()}`);

  return (
    <Downshift
      onChange={onChange}
      selectedItem={selectedItem || items.get(0)}
      itemToString={itemToString}
    >
      {({
        isOpen,
        selectedItem,
        getToggleButtonProps,
        getRootProps,
        getItemProps,
        getMenuProps,
        getLabelProps,
        highlightedIndex,
      }) => (
        <div
          {...getRootProps({}, { suppressRefError: true })}
          role="group"
          className={cx(theme.root, className)}
        >
          <label {...getLabelProps()} className={theme.label}>
            {selectedItem.get('label')}
          </label>
          <Button {...getToggleButtonProps()} className={theme.select}>
            <Text primary lowercase>
              {selectedItem.get('label')}
            </Text>
            <Icon
              name={isOpen ? 'ArrowUp' : 'ArrowDown'}
              className={theme.arrow}
              title="Expand list"
              aria-hidden="true"
              focusable="false"
              role="presentation"
            />
          </Button>
          <ul
            {...getMenuProps()}
            className={cx(theme.dropdown, { [theme.open]: isOpen })}
          >
            <MapArray
              theme={theme}
              parentId={id}
              highlighted={highlightedIndex}
              getItemProps={getItemProps}
              array={items.filter((i) => !i.equals(selectedItem))}
              factory={Item}
            />
          </ul>
        </div>
      )}
    </Downshift>
  );
};
