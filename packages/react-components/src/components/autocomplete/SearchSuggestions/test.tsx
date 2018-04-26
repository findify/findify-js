import React from 'react'
import { shallow } from 'enzyme'
import theme from './styles.css'
import SearchSuggestions from './view'

const createAnyGetMock = (value) => ({
  get: () => value,
  hashCode: () => value
})


describe('SearchSuggestions', () => {
  it('renders correctly', () => {
    expect(
      shallow(
        <SearchSuggestions
          theme={theme}
          suggestions={[
            createAnyGetMock('aisaka taiga'),
            createAnyGetMock('ryuuji takasu'),
          ]}
          query={createAnyGetMock('ta')} />
      )
    ).toMatchSnapshot()
  })
})
