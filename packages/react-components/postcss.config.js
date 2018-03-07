const { compact, noop } = require('lodash');
const path = require('path');

module.exports = ctx => ({
  plugins: compact([
    require('postcss-import')({
      addModulesDirectories: path.resolve(__dirname, 'src')
    }),
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
  ]),
});
