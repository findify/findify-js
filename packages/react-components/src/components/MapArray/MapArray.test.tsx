import React from 'react'
import { shallow } from 'enzyme'
import MapArray from './index'
import itemMock from '../../../jest/item.mock';

const items = [
  itemMock(
    'Test Title',
    'https://picsum.photos/100/200'
  ),
  itemMock(
    'Test Title 2',
    'https://picsum.photos/100/200'
  )
]

describe('ItemCard', () => {
  it('renders correctly', () => {
    expect(shallow(
      <MapArray
        array={items}
        factory={({ item, key }) =>
          <div key={key}>{item.get('title')} {item.get('image_url')}</div>
        }
        keyAccessor={item => item.hashCode()} />)).toMatchSnapshot()
  })
})
