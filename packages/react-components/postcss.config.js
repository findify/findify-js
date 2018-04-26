const { compact, noop } = require('lodash');
const path = require('path');

module.exports = (ctx = {}) => ({
  plugins: compact([
    require('postcss-for'),
    require('./scripts/postcssScopedVariables')({
      contentBase: __dirname,
      include: [path.resolve(__dirname, 'src/variables.css')]
    }),
    !!ctx.webpack && require('postcss-custom-properties')({ preserve: false }),
    // require('postcss-pxtorem'),
    require('postcss-focus'),
    require('postcss-calc'),
    require('postcss-clearfix'),
    require('postcss-nested'),
    require('postcss-color-function'),
    !!ctx.development && require('postcss-reporter')({ clearReportedMessages: true }),
    require('autoprefixer'),
  ]),
});
