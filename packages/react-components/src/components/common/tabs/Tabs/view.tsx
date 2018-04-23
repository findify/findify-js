import React from 'react'

interface ITabsProps {
  /** Currently selected tab. Keep it empty if you want to use Tabs in self-controlled mode */
  selectedIndex?: number

}

export default function Tabs({ theme, children, onTabClick, body, selectedIndex }) {
  return (
    <React.Fragment>
      <ul className={theme.tabList}>
        {
          React.Children.map(children, (child, idx) => (
            <li
              key={idx}
              className={theme.tabHeaderItem}
              onClick={child.props.disabled ?
                        undefined :
                        (onTabClick ?
                          onTabClick.bind(null, idx) :
                          undefined)
              }>
              {React.createElement(child.props.header, {
                      isActive: selectedIndex === idx,
                      isDisabled: child.props.disabled,
              })}
            </li>
          ))
        }
      </ul>
      <div className={theme.tabBody}>
        { body }
      </div>
    </React.Fragment>
  )
}
