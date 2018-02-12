import { getFacetType } from './filters';
import { isArray, isObject } from './helpers';
import { Map, List, isImmutable } from 'immutable';

const isValidField = (values, key) =>
  values
  .every((value, i) => {
    const prev = values.get(i - 1);
    const match = !i || typeof value === typeof prev;
    if (!match) {
      console.error(
        `Filter "${key}" has mixed values: [${values
          .map(getFacetType)
          .join(', ')}
        ]`
      );
    }
    return match;
  });

export const getChangedFields = (prev, next) => {
  if (next && isImmutable(next) ? next.equals(prev) : next === prev) return false;
  if (!prev || !isImmutable(next)) return next;
  if (!next || next.isEmpty()) return next;
  return next.reduce((acc, value, key) => {
    if (prev.has(key) && prev.get(key).equals(value)) return acc;
    return value instanceof List && isValidField(value.filter(v => v), key)
      ? acc.set(key, value)
      : acc;
  }, Map());
};
