import React from 'react'

export type MapCallback = (item: any, index: number, arrayLike) => any
export type KeyAccessor = (item: any, index: number) => string
export type ArrayLike = {
  map: (callback: MapCallback) => any,
  length: number,
  slice: (from: number, to: number?) => ArrayLike
}
export type ReactFactory = (props: object) => React.Component
export type MapArrayProps = { array: ArrayLike, keyAccessor: KeyAccessor, factory: ReactFactory, limit: number }

export default function MapArray({array, keyAccessor, factory, limit}: MapArrayProps) {
  return Array.from(
    array.slice(0, limit || array.length)
      .map((item, index) => factory({ item, index, key: keyAccessor(item, index) }))
  )
}
