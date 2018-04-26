import React from 'react'
import { mount } from 'enzyme'
import { Tabs, Tab } from './index'

const tabData = [
  {
    header: (props) => <h1 {...props}>Hello world</h1>,
    disabled: false,
    children: <p>Wazzup!</p>
  },
  {
    header: (props) => <h1 {...props}>Goodbye world</h1>,
    disabled: true,
    children: <p>Wazzup, tab 2 here!</p>
  },
  {
    header: (props) => <h1 {...props}>See ya later, world</h1>,
    disabled: false,
    children: <p>Tab 3 it is!</p>
  }
]

describe('Tabs', () => {
  it('renders first tab by default', () => {
    expect(mount(createTabs(tabData))).toMatchSnapshot()
  })

  it('respects defaultSelectedIndex property', () => {
    expect(mount(createTabs(tabData, { defaultSelectedIndex: 2 }))).toMatchSnapshot()
  })


  it('respects selectedIndex property', () => {
    expect(mount(createTabs(tabData, { defaultSelectedIndex: 2, selectedIndex: 0 }))).toMatchSnapshot()
  })
})

function createTabs(tabArr, props = {}) {
  return (
    <Tabs {...props}>
      {
        tabArr.map(tabProps => React.createElement(Tab, tabProps))
      }
    </Tabs>
  )
}
