import React from 'react'

export type MapCallback = (item: any, index: number, arrayLike) => any
export type KeyAccessor = (item: any, index: number) => string
export type ArrayLike = {
  map: (callback: MapCallback) => any,
  length: number,
  slice: (from: number, to?: number) => ArrayLike
}
export type ReactFactory = (props: object) => React.Component
export type MapArrayProps = {
  array: ArrayLike,
  keyAccessor?: KeyAccessor,
  factory: ReactFactory,
  limit?: number,
  [key: string]: any
}

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
