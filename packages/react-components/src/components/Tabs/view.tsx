import React from 'react'
import { withHandlers } from 'recompose';
import cx from 'classnames';

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
)

export default ({ theme, children, onTabClick, body, selectedIndex }) =>
  <React.Fragment>
    <ul className={theme.list}>
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
    <div className={theme.body}>
      { body }
    </div>
  </React.Fragment>
