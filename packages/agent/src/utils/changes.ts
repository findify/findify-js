import { getFacetType } from './filters';
import { isArray, isObject } from './helpers';
import { Map, List } from 'immutable';

const isValidField = (values, key) =>
  values.every((value, i) => {
    const match =
      !i ||
      (typeof value === typeof values[i - 1] &&
        value === values[i - 1].isArray);
    if (!match)
      console.error(
        `Filter "${key}" has mixed values: [${values
          .map(getFacetType)
          .join(', ')}]`
      );
    return match;
  });

export const getChangedFields = (prev, next) => {
  if (prev === next) return false;
  if (!prev || typeof next === 'string') return next;
  if (next.isEmpty()) return next;
  return next.reduce((acc, value, key) => {
    if (prev.get(key).equals(value)) return acc;
    return value instanceof List && isValidField(value, key)
      ? acc.set(key, value)
      : acc;
  }, Map());
};
