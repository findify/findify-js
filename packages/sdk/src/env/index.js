var findifyEnv =
  typeof process !== 'undefined' && process.env && process.env.FINDIFY_ENV;

module.exports = require('./' + (findifyEnv || 'production'));
