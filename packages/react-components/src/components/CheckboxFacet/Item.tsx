/**
 * @module components/CheckboxFacet
 */

import React from 'react';
import content from 'components/CheckboxFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { IFacetValue, ThemedSFCProps } from 'types';

/** Props that CheckboxFacet Item accepts */
interface ICheckboxFacetItemProps extends ThemedSFCProps {
  /** Single item from facet */
  item: IFacetValue;
  /** CheckboxFacet Item click handler */
  onItemClick?: (evt: Event) => any;
  /** Custom inline style */
  style: { [x: string]: string | number };
}

const Item = ({ item, theme, style, onItemClick }: ICheckboxFacetItemProps) =>
  <Button style={style} className={theme.item} onClick={(evt) => {
    item.toggle(evt)
    onItemClick && onItemClick(evt);
  }}>
    <Icon name={item.get('selected') ? 'CheckboxFilled' : 'CheckboxEmpty'} />
    <Text primary lowercase bold={item.get('selected')}>
      { content({ item }) }
    </Text>
    <Text secondary uppercase>
      ({item.get('count')})
    </Text>
  </Button>

export default Item;
