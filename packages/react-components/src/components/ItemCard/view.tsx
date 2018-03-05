import React from 'react'

const ItemCard = ({ item }) => (
  <div className="findify__item-card">
    <h4 className="findify__item-card__title">{item.get('title')}</h4>
    <img className="findify__item-card__image" src={item.get('image_url')} />
  </div>
)

export default ItemCard
