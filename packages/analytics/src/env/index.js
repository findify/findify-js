var findifyEnv =
  (typeof process !== 'undefined' && process.env && process.env.FINDIFY_ENV) ||
  'production';

module.exports = require('./' + findifyEnv);
