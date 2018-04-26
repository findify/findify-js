import React from 'react'
import { shallow } from 'enzyme'
import ItemCard from './index'
import itemMock from '../../../jest/item.mock';
describe('ItemCard', () => {
  it('renders correctly', () => {
    expect(shallow(<ItemCard item={itemMock(
      'Test Title',
      'https://picsum.photos/100/200'
    )} />)).toMatchSnapshot()
  })
})
