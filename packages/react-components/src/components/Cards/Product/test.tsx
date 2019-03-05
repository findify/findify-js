import React from 'react'
import { fromJS } from 'immutable';
import ProductCardView from './view'
import theme from './styles.css'
import { shallow } from 'enzyme'
import { get as _get } from 'lodash'

const itemMock = fromJS({
  product_url: "https://foo.bar",
  image_url: "https://lorempicsum.net/100/100",
  description: "A description for item",
  thumbnail_url: "https://lorempicsum.net/50/50",
  title: "Product Title",
  price: '9.99',
  reviews: { average_rating: 0 }
});

const configMock = fromJS({
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
  currency_config: { 
    code: "USD",
    symbol: '$',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    decimalDigits: 2
  },
})

describe('ProductCard view', () => {
  it('renders correctly', () => {
    expect(shallow(
      <ProductCardView
        theme={{}}
        item={itemMock}
        config={configMock}
        theme={theme}
      />
    )).toMatchSnapshot()
  })
})
