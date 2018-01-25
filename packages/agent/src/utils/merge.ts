const isObject = require('lodash/isObject');
const mergeWith = require('lodash/fp/mergeWith');

export const deepMerge = mergeWith(
  (obj, src) => isObject(src) ? { ...obj, ...src } : src
);
