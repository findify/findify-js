import react from 'react'
import ItemCard from '../ItemCard';
import MapArray from '../MapArray';

const ItemFactory = ({ props }) => <ItemCard {...props} />
const keyAccessor = item => item.hashCode()

export default ({ items }) => (
  <MapArray array={items} factory={ItemFactory} keyAccessor={keyAccessor} />
)
