import react from 'react'

export type MapCallback = (item: any, index: number, arrayLike) => any
export type KeyAccessor = (item: any) => string
export type ArrayLike = {
  map: (callback: MapCallback) => any
}
export type ReactFactory = (props: object) => react.Component
export type MapArrayProps = { array: ArrayLike, keyAccessor: KeyAccessor, factory: ReactFactory }

export default function MapArray({array, keyAccessor, factory}: MapArrayProps) {
  return array.map(item => factory({ item, key: keyAccessor(item) }))
}
