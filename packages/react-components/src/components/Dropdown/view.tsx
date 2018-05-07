import React from 'react';
import cx from 'classnames';
import Downshift from 'downshift';
import MapArray from 'components/common/MapArray';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Text from 'components/Text';

const Item = ({ item, index, getItemProps, highlighted, theme }) => (
  <Button
    className={cx(theme.option, highlighted === index && theme.highlighted)}
    {...getItemProps({ item })}>
    <Text primary lowercase>
      { item.get('label') }
    </Text>
  </Button>
);

export default ({ onChange, items, selectedItem, theme, className }) =>
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
