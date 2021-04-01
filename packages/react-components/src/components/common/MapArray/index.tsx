/**
 * @module components/common/MapArray
 */
import { createElement } from 'react';
import { isImmutable } from 'immutable';
import { Immutable } from '@findify/store-configuration';

/** MapCallback is a type signature for array.map(), immutable.List().map() callback */
export type MapCallback = (
  item: any,
  index: number,
  arrayLike: ArrayLike
) => any;
/** KeyAccessor is a function of item and index, returning a React key for rendering */
export type KeyAccessor = (item: any, index: number) => string;

/** ArrayLike can possibly an array or an instance of immutable.List() */
export type ArrayLike = {
  map: (callback: MapCallback) => any;
  length?: number;
  size?: number;
  slice: (from: number, to?: number) => ArrayLike;
};

/** ReactFactory is a type for React Factory producing components */
export type ReactFactory = (props: object) => React.Component;

/** List of props which MapArray component accepts */
export type MapArrayProps = {
  /** Array-like object which is mapped over */
  array: ArrayLike | Immutable.Factory<any>;
  /** Function used to extract React rendering key */
  keyAccessor?: KeyAccessor;
  /** React component factory */
  factory: React.FC<any>;
  /** Maximum possible limit for iteration */
  limit?: number | false;

  mapProps?: (
    items: any
  ) => void | {
    [key: string]: any;
  };
  /** Rest of the props, passed down to children */
  [key: string]: any;
};

/** Default key accessor, used in case no keyAccessor is provided */
const defaultKeyAccessor = (item, index) =>
  item.hashCode ? item.hashCode() : index;

const defaultPropsMapper = () => undefined;

export default ({
  array,
  keyAccessor = defaultKeyAccessor,
  mapProps = defaultPropsMapper,
  factory,
  limit,
  ...rest
}: MapArrayProps) => {
  const _array = limit ? array.slice(0, limit || array.length) : array;
  const res = _array.map((item, index) =>
    createElement(factory, {
      ...rest,
      ...mapProps(item),
      item,
      index,
      key: keyAccessor(item, index),
    })
  );

  return isImmutable(res) ? res.toArray() : res;
};
