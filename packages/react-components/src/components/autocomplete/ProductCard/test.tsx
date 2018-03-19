import React from 'react'
import ProductCardView from './view'
import { shallow } from 'enzyme'
import { get as _get } from 'lodash'

const itemMock = {
  product_url: "https://foo.bar",
  image_url: "https://lorempicsum.net/100/100",
  description: "A description for item",
  thumbnail_url: "https://lorempicsum.net/50/50",
  title: "Product Title",
  price: "9.99",

  get(key) {
    return this[key]
  },

  getIn(path, obj) {
    if (path.length === 0) return obj
    const nPath = Array.isArray(path) ? path.slice() : [path]
    const key = nPath.shift()
    if ((obj && !obj[key]) || this[key]) return void 0
    return this.getIn(nPath, (obj ? obj[key] : this[key]))
  }
}

const configMock = {
  productcard: {
      title: {
      display: true,
      lines: 1
    },
    description: {
      display: true,
      lines: 2
    },
    price: {
      display: true
    },
  },
  get(key) {
    return _get(this, key)
  },
  getIn(path, obj) {
    if (path.length === 0) return obj
    const nPath = Array.isArray(path) ? path.slice() : [path]
    const key = nPath.shift()
    if ((obj && !obj[key]) || this[key]) return void 0
    return this.getIn(nPath, (obj ? obj[key] : this[key]))
  }
}

describe('ProductCard view', () => {
  it('renders correctly', () => {
    expect(shallow(
      <ProductCardView
        item={itemMock}
        config={configMock}
      />
    )).toMatchSnapshot()
  })
})
