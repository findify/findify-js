import React from 'react'
import ItemCard from '../ItemCard';
import mapArray from '../common/MapArray';

const ItemFactory = React.createFactory(ItemCard);

export default ({ items, wrapper: Wrapper = React.Fragment, ...wrapperProps }) => (
  <Wrapper {...wrapperProps}>
    { mapArray({ array: items, factory: ItemFactory }) }
  </Wrapper>
)
