import { isObject } from './helpers';
const mergeWith = require('lodash/fp/mergeWith');

export const deepMerge = mergeWith(
  (obj, src) => isObject(src) ? { ...obj, ...src } : src
);
