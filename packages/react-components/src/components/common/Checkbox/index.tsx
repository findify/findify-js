/**
 * @module components/CheckboxFacet
 */

import { useCallback } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { IFacetValue, ThemedSFCProps } from 'types';
import styles from 'components/common/Checkbox/styles.css';
import cx from 'classnames';

/** Props that CheckboxFacet Item accepts */
export interface ICheckboxFacetItemProps extends ThemedSFCProps {
  /** Single item from facet */
  item: IFacetValue;
  /** CheckboxFacet Item click handler */
  onItemClick?: (evt: Event) => any;
  /** Custom inline style */
  style: { [x: string]: string | number };

  content: (x: any) => string;

  config: Map<string, any>;
  isMobile?: boolean;
}

export default ({
  item,
  theme = styles,
  style,
  onItemClick,
  content,
  config,
  isMobile,
}: ICheckboxFacetItemProps) => {
  const onClick = useCallback(
    (evt) => {
      item.toggle(evt);
      onItemClick && onItemClick(evt);
    },
    [item, onItemClick]
  );

  const isSelected = item.get('selected');

  return (
    <Button
      style={style}
      role="checkbox"
      aria-checked={isSelected ? 'true' : 'false'}
      tabIndex={0}
      onClick={onClick}
      className={cx(theme.item, isMobile && theme.mobile)}
    >
      <Icon
        className={theme.icon}
        name={isSelected ? 'CheckboxFilled' : 'CheckboxEmpty'}
        title={isSelected ? 'Selected' : 'Not selected'}
      />
      <Text primary lowercase className={theme.content} bold={isSelected}>
        {content({ item, config })}
      </Text>
      <Text secondary uppercase>
        ({item.get('count')})
      </Text>
    </Button>
  );
};
