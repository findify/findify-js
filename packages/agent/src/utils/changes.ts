import { getFacetType } from './filters';
import { Map, List, isImmutable } from 'immutable';
import deepMerge from './deepMerge';

const isValidField = (values: any, key) =>
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
  return deepMerge(prev, next).reduce((acc, value, key) => {
    if (!next.has(key)) return acc.set(key, null);
    if (prev.has(key) && prev.get(key).equals(value)) return acc;
    if (List.isList(value) && !isValidField((value as any).filter(v => v), key)) return acc;
    return acc.set(key, value);
  }, Map());
};
