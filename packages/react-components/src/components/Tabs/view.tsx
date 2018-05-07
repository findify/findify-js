import React from 'react'
import { withHandlers, withPropsOnChange, compose } from 'recompose';
import cx from 'classnames';
import Dropdown from 'components/Dropdown';
import { fromJS } from 'immutable';

interface ITabsProps {
  /** Currently selected tab. Keep it empty if you want to use Tabs in self-controlled mode */
  selectedIndex?: number

}

const Item = withHandlers({
  onClick: ({ disabled, onClick, index }) => (e) => {
    if (disabled) return;
    if (e) e.preventDefault();
    return onClick(index);
  }
})(({ onClick, label, theme, active, disabled }) =>
  <li
    className={cx(theme.tab, active && theme.active, disabled && theme.disabled)}
    onClick={onClick}
  >
    {label}
  </li>
);

const MobileDropdown = compose(
  withHandlers({
    onChange: ({ onChange }) => item => onChange(item.get('index'))
  }),
  withPropsOnChange(['children'], ({ children, selectedIndex }) => ({
    items: fromJS(React.Children.toArray(children).map((i, index) => ({
      index,
      label: i.props.label,
    })))
  }))
)(({ items, selectedIndex, onChange }: any) => 
  <Dropdown
    selectedItem={items.get(selectedIndex)}
    onChange={onChange}
    items={items}
  />
)

export default ({ theme, children, onTabClick, body, selectedIndex, isMobile = false }) =>
  <React.Fragment>
    <ul className={theme.list} display-if={!isMobile}>
      { 
        React.Children.map(children, (child, idx) =>
          <Item
            {...child.props}
            index={idx}
            key={idx}
            active={idx === selectedIndex}
            theme={theme}
            onClick={onTabClick} />
        )
      }
    </ul>
    <MobileDropdown
      display-if={isMobile}
      children={children}
      selectedIndex={selectedIndex}
      onChange={onTabClick} />
    <div className={theme.body}>
      { body }
    </div>
  </React.Fragment>
