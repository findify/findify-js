import React from 'react'
import { compose, setDisplayName, withProps, withPropsOnChange, withStateHandlers } from 'recompose'
import withTheme from 'helpers/withTheme'
import theme from 'components/Tabs/styles.css'
import view from 'components/Tabs/view'

const nullOrUndefined = (val) => val === null || typeof val === 'undefined'

export const Tabs = compose(
  setDisplayName('Tabs'),

  withTheme(theme),

  withStateHandlers(
    ({ selectedIndex = 0 }) => ({ selectedIndex }),
    {
      onTabClick: (_, { onTabClick }) => (selectedIndex) => {
        if (onTabClick) onTabClick(selectedIndex)
        return ({ selectedIndex })
      }
    }
  ),

  withPropsOnChange(['selectedIndex'], ({ children, selectedIndex, onTabClick }) => {
    const bodyCandidate = React.Children.toArray(children)[selectedIndex];
    return ({
      body: React.cloneElement(bodyCandidate.props.children, { changeTab: onTabClick })
    })
  })
)(view);

export const Tab = () => null;
