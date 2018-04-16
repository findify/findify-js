import React from 'react'
import ProductCard from 'components/productcard/ProductCard'
import mapArray from 'components/common/MapArray';

const ItemFactory = React.createFactory(ProductCard);

export default ({ items, wrapper: Wrapper = React.Fragment, ...rest }) => {
  const { limit, factory, keyAccessor, ...wrapperProps } = rest
  return (
    <Wrapper {...wrapperProps}>
      { mapArray({ keyAccessor, limit, array: items, factory: factory || ItemFactory, ...wrapperProps }) }
    </Wrapper>
  )
}
