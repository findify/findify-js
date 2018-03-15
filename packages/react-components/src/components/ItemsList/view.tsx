import React from 'react'
import ItemCard from '../ItemCard';
import MapArray from '../helpers/MapArray';

const ItemFactory = React.createFactory(ItemCard);
const keyAccessor = item => item.hashCode()

export default ({ items }) => (
  <MapArray array={items} factory={ItemFactory} keyAccessor={keyAccessor} />
)
