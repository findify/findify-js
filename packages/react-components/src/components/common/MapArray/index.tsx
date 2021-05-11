/**
 * @module components/common/MapArray
 */
import { createElement, memo, useMemo } from 'react';
import { is, isImmutable } from 'immutable';
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
    items: any,
    index: number
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

const Item = ({ Component, mapProps, ...rest }) => {
  const extraProps = mapProps
    ? useMemo(() => mapProps(rest.item, rest.index), [rest.item, rest.index])
    : undefined;

  return <Component {...rest} {...extraProps} />;
};

export default ({
  array,
  keyAccessor = defaultKeyAccessor,
  mapProps = defaultPropsMapper,
  container,
  factory,
  limit,
  ...rest
}: MapArrayProps) => {
  const _array = limit ? array.slice(0, limit || array.length) : array;
  const res = _array.map((item, index) => (
    <Item
      key={keyAccessor(item, index)}
      Component={factory}
      index={index}
      item={item}
      mapProps={mapProps}
      {...rest}
    />
  ));

  return isImmutable(res) ? res.valueSeq() : res;
};
