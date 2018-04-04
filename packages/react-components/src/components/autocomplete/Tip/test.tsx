import React from 'react'
import Tip from './view'
import theme from './styles.css'
import { shallow } from 'enzyme'

const config = {
  get: () => 'Press Enter to search'
}

const createSuggestionMock = (size, value) => ({
  getIn() {
    return value
  },
  size
})

describe('Tip', () => {
  it('renders correctly', () => {

    expect(
      shallow(
        <Tip
          className='test'
          title='Press Enter to search'
          theme={theme}
          suggestions={createSuggestionMock(0)}
          getSuggestionProps={() => ({ onClick: () => {} })} />
      )
    ).toMatchSnapshot()

    expect(
      shallow(
        <Tip
          className='test'
          suggestions={createSuggestionMock(2, 'evangelion')}
          title='Press Enter to search'
          theme={theme}
          getSuggestionProps={() => ({ onClick: () => {} })} />
      )
    ).toMatchSnapshot()
  })
})
