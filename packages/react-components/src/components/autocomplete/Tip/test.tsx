import React from 'react'
import Tip from './view'
import theme from './styles.css'
import { shallow } from 'enzyme'

const config = {
  get: () => 'Press Enter to search'
}

const createQueryMock = (value) => ({
  get() {
    return value
  }
})

describe('Tip', () => {
  it('renders correctly', () => {

    expect(
      shallow(
        <Tip className='test' title='Press Enter to search' theme={theme} />
      )
    ).toMatchSnapshot()

    expect(
      shallow(
        <Tip className='test' query={createQueryMock('')} title='Press Enter to search' theme={theme} />
      )
    ).toMatchSnapshot()

    expect(
      shallow(
        <Tip className='test' query={createQueryMock('qu')} title='Press Enter to search' theme={theme}  />
      )
    ).toMatchSnapshot()
  })
})
