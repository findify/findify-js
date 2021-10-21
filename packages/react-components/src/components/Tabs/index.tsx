/**
 * @module components/Tabs
 */

import { Children, cloneElement, useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import Dropdown from 'components/Dropdown';
import { fromJS } from 'immutable';
import { ThemedSFCProps } from 'types';
import styles from 'components/Tabs/styles.css';
import { useMobile } from 'helpers/useMobile';

export interface ITabsProps extends ThemedSFCProps {
  /** Currently selected tab. Keep it empty if you want to use Tabs in self-controlled mode */
  selectedIndex?: number;
  /** Flag to render Tabs in mobile mode */
  isMobile?: boolean;
  /** Tab click event handler */
  onTabClick: (evt: Event) => any;
  /** Current tab body */
  body: React.ReactChildren;
}

export const Tab = () => null;

const Item = ({ onClick, label, theme, active, disabled, index }) => {
  const _onClick = useCallback((e) => {
    if (disabled) return;
    if (e) e.preventDefault();
    return onClick(index);
  }, []);

  return (
    <li
      className={cx(
        theme.tab,
        active && theme.active,
        disabled && theme.disabled
      )}
      onClick={_onClick}
    >
      {label}
    </li>
  );
};

const MobileDropdown = ({ children, selected, onChange, className }) => {
  const _onChange = useCallback((item) => onChange(item.get('index')), []);

  const items = useMemo(
    () =>
      fromJS(
        Children.toArray(children).map((i, index) => ({
          index,
          label: i.props.label,
        }))
      ),
    [children]
  );

  return (
    <Dropdown
      className={className}
      selectedItem={items.get(selected)}
      onChange={_onChange}
      items={items}
    />
  );
};

export default ({
  theme = styles,
  children,
  onTabClick,
  selectedIndex = 0,
}: ITabsProps) => {
  const [selected, setSelected] = useState(selectedIndex);
  const isMobile = useMobile();
  const onSelect = useCallback((selectedIndex) => {
    if (onTabClick) onTabClick(selectedIndex);
    setSelected(selectedIndex);
  }, []);

  const body = useMemo(() => {
    const candidate = Children.toArray(children)[selected];
    return cloneElement(candidate.props.children, {
      changeTab: onSelect,
    });
  }, [selected]);

  return (
    <>
      <ul className={theme.list} display-if={!isMobile}>
        {Children.map(children, (child, index) => (
          <Item
            {...child.props}
            index={index}
            key={index}
            active={index === selected}
            theme={theme}
            onClick={onSelect}
          />
        ))}
      </ul>

      <MobileDropdown
        display-if={isMobile}
        children={children}
        selected={selected}
        className={theme.dropdown}
        onChange={onSelect}
      />

      <div className={theme.body}>{body}</div>
    </>
  );
};
