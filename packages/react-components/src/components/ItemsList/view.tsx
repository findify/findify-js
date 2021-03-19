/**
 * @module components/ItemsList
 */

import * as React from 'react';
import ProductCard from 'components/Cards/Product';
import mapArray, { MapArrayProps } from 'components/common/MapArray';

// Default item factory is using ProductCard
const ItemFactory = React.createFactory(ProductCard);

/** Props that ItemList view accepts */
export interface IItemsListProps extends MapArrayProps {
  /** Wrapper around mapArray */
  wrapper: React.ComponentType;
  /** Rest props that are passed to wrapper */
  [x: string]: any;
}

export default ({
  items,
  wrapper: Wrapper = React.Fragment,
  ...rest
}: IItemsListProps) => {
  const { limit, factory, keyAccessor, ...wrapperProps } = rest;
  return (
    <Wrapper {...wrapperProps}>
      {mapArray({
        keyAccessor,
        limit,
        array: items,
        factory: factory || ItemFactory,
        ...wrapperProps,
      })}
    </Wrapper>
  );
};
