import react from 'react'
import ItemCard from '../ItemCard';

export default ({ items }) => (
  items.map(item => (
    <ItemCard key={item.hashCode()} item={item} />
  ))
)
