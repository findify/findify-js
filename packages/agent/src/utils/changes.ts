import { getFacetType } from './filters';
import { isString, isArray, isEmpty, isEqual } from 'lodash/fp';

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
  if (isEqual(prev, next)) return;
  if (!prev || isString(next)) return next;
  if (isEmpty(next)) return next;
  return Object.keys(next).reduce((acc, key) => {
    if (prev[key] === next[key]) return acc;
    return isArray(next[key]) && isValidField(next[key], key)
      ? { ...acc, [key]: next[key] }
      : acc;
  }, undefined);
};
