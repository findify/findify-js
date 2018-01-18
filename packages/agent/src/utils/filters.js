'use strict';
exports.__esModule = true;
var fp_1 = require('lodash/fp');
var constants_1 = require('../constants');
exports.getFacetType = function(value) {
  if (fp_1.isArray(value)) return constants_1.FacetTypes.category;
  if (fp_1.isObject(value)) return constants_1.FacetTypes.range;
  return constants_1.FacetTypes.text;
};
exports.normalizeFilters = function(filters) {
  return Object.keys(filters).reduce(function(acc, key) {}, {});
};
