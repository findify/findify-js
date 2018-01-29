import { getFacetType } from './filters';
import { isArray, isObject } from './helpers';

const isValidField = (values, key) =>
  values.every((value, i) => {
    const match =
      !i ||
      (typeof value === typeof values[i - 1] &&
        value.isArray === values[i - 1].isArray);
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
  return next.reduce((acc, key) => {
    if (prev[key] === next[key]) return acc;
    return isArray(next[key]) && isValidField(next[key], key)
      ? { ...(acc || {}), [key]: next[key] }
      : acc;
  }, undefined);
};
