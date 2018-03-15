import React from 'react'
import Tip from './view'
import { shallow } from 'enzyme'

const config = {
  get: () => 'Press Enter to search'
}

describe('Tip', () => {
  it('renders correctly', () => {
    expect(
      shallow(
        <Tip className='test' query='' title='Press Enter to search' />
      )
    ).toMatchSnapshot()

    expect(
      shallow(
        <Tip className='test' query='qu' title='Press Enter to search' />
      )
    ).toMatchSnapshot()
  })
})
