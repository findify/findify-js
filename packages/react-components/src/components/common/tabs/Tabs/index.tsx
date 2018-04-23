import React from 'react'
import { compose, setDisplayName, withProps, withPropsOnChange, withStateHandlers } from 'recompose'
import withTheme from 'helpers/withTheme'
import theme from 'components/common/tabs/Tabs/styles.css'
import view from 'components/common/tabs/Tabs/view'

const nullOrUndefined = (val) => val === null || typeof val === 'undefined'

export default compose(
  setDisplayName('Tabs'),
  withTheme(theme),
  withPropsOnChange(['selectedIndex'], ({ selectedIndex }) => ({
    selectedIndex,
    controlled: typeof selectedIndex !== 'undefined',
  })),
  withPropsOnChange(['defaultSelectedIndex'], ({ defaultSelectedIndex, selectedIndex }) => ({
    selectedIndex: !nullOrUndefined(defaultSelectedIndex) && nullOrUndefined(selectedIndex) ? defaultSelectedIndex : 0
  })),
  withStateHandlers(
    ({ selectedIndex = 0 }) => ({ selectedIndex }),
    {
      setSelectedIndex: ({ selectedIndex, onTabClick = () => {} }) => (index, evt) => {
        onTabClick(index)
        return ({ selectedIndex: index })
      }
    }
  ),
  withProps(({ onTabClick = () => {}, setSelectedIndex, controlled }) => {
    if (controlled) return ({ onTabClick })
    return ({ onTabClick: setSelectedIndex })
  }),
  withPropsOnChange(['selectedIndex'], ({ children, selectedIndex }) => {
    const bodyCandidate = React.Children.toArray(children)[selectedIndex]

    return ({
      body: bodyCandidate ? React.createElement(React.Fragment, { children: bodyCandidate.props.children }) : null
    })
  })
)(view)
