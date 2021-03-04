/**
 * @module components/CheckboxFacet
 */

import React, { useCallback } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { IFacetValue, ThemedSFCProps } from 'types';
import useTheme from 'helpers/useTheme';
import styles from 'components/common/Checkbox/styles.css';

/** Props that CheckboxFacet Item accepts */
export interface ICheckboxFacetItemProps extends ThemedSFCProps {
  /** Single item from facet */
  item: IFacetValue;
  /** CheckboxFacet Item click handler */
  onItemClick?: (evt: Event) => any;
  /** Custom inline style */
  style: { [x: string]: string | number };

  content: (x: any) => string
}

export default ({ item, theme: _theme, style, onItemClick, content, config }: ICheckboxFacetItemProps) => {
  const theme = useTheme(_theme, styles);

  const onClick = useCallback((evt) => {
    item.toggle(evt)
    onItemClick && onItemClick(evt);
  }, [item, onItemClick]);

  const isSelected = item.get('selected');

  return (
    <Button
      style={style}
      role="checkbox"
      aria-checked={isSelected ? 'true' : 'false'}
      tabIndex={0}
      className={theme.item}
      onClick={onClick}
    >
      <Icon
        className={theme.icon}
        name={isSelected ? 'CheckboxFilled' : 'CheckboxEmpty'}
        title={isSelected ? 'Selected' : 'Not selected'}
      />
      <Text
        primary
        lowercase
        className={theme.content}
        bold={isSelected}
      >
        { content({ item, config }) }
      </Text>
      <Text secondary uppercase>
        ({item.get('count')})
      </Text>
    </Button>
  )
}
