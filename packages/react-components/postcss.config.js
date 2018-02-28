const { compact } = require('lodash');

module.exports = ctx => ({
  plugins: compact([
    require('postcss-smart-import'),
    require('postcss-custom-properties'),
    require('postcss-focus'),
    require('postcss-for'),
    require('postcss-calc'),
    require('postcss-clearfix'),
    require('postcss-nested'),
    require('postcss-color-function'),
    require('postcss-simple-vars'),
    ctx.development &&
      require('postcss-reporter')({ clearReportedMessages: true }),
    require('autoprefixer'),
    require('postcss-font-magician'),
  ]),
});
