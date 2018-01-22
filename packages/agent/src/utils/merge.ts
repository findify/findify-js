import { mergeWith, isObject } from 'lodash/fp';

export const deepMerge = mergeWith(
  (obj, src) => isObject(src) ? { ...obj, ...src } : src
);
