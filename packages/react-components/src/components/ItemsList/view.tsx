import React from 'react'
import ItemCard from '../ItemCard';
import MapArray from '../common/MapArray';

const ItemFactory = React.createFactory(ItemCard);
const keyAccessor = item => item.hashCode()

export default ({ items }) => (
  <MapArray array={items} factory={ItemFactory} keyAccessor={keyAccessor} />
)
