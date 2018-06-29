/**
 * @module components/common/MapArray
 */
import 'core-js/fn/array/from';
import React from 'react'

/** MapCallback is a type signature for array.map(), immutable.List().map() callback */
export type MapCallback = (item: any, index: number, arrayLike: ArrayLike) => any
/** KeyAccessor is a function of item and index, returning a React key for rendering */
export type KeyAccessor = (item: any, index: number) => string

/** ArrayLike can possibly an array or an instance of immutable.List() */
export type ArrayLike = {
  map: (callback: MapCallback) => any,
  length?: number,
  size?: number;
  slice: (from: number, to?: number) => ArrayLike
}

/** ReactFactory is a type for React Factory producing components */
export type ReactFactory = (props: object) => React.Component

/** List of props which MapArray component accepts */
export type MapArrayProps = {
  /** Array-like object which is mapped over */
  array: ArrayLike,
  /** Function used to extract React rendering key */
  keyAccessor?: KeyAccessor,
  /** React component factory */
  factory: ReactFactory,
  /** Maximum possible limit for iteration */
  limit?: number,
  /** Rest of the props, passed down to children */
  [key: string]: any
}

/** Default key accessor, used in case no keyAccessor is provided */
const defaultKeyAccessor = (item, index) => item.hashCode();

export default ({
  array,
  keyAccessor = defaultKeyAccessor,
  factory,
  limit,
  ...rest
}: MapArrayProps) => {
  const f = React.createFactory(factory);
  const res: any = Array.from(
    array.slice(0, limit || array.length)
      .map((item, index) => f({ ...rest, item, index, key: keyAccessor(item, index) }))
  );
  return res;
}
