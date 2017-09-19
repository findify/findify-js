const path = require('path');
const { getLocalIdent } = require('../.bin/helpers/cssIndent.js');

module.exports = function(storybookBaseConfig, configType) {
  storybookBaseConfig.module.loaders.push({
    test: /\.json/,
    loader: 'json-loader',
  });
  storybookBaseConfig.module.loaders.push({
    test: /\.global\.css/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader'],
  });
  storybookBaseConfig.module.loaders.push({
    test: /^((?!global).)*\.css/,
    loaders: ['style-loader', 'css-loader?modules&camelCase', 'postcss-loader'],
  });
  storybookBaseConfig.module.loaders.push({
    test: /\.tsx?$/,
    loader: 'ts-loader',
    include: [
      path.resolve(process.cwd(), 'src'),
      path.resolve(process.cwd(), 'dev'),
    ],
  });

  storybookBaseConfig.resolve = Object.assign({}, storybookBaseConfig.resolve, {
    extensions: ['', ' ', '.ts', '.tsx', '.js', '.jsx', '.css'],
    alias: Object.assign({}, storybookBaseConfig.resolve.alias, {
      helpers: path.resolve(process.cwd(), 'src/helpers'),
      widgets: path.resolve(process.cwd(), 'src/widgets'),
      internals: path.resolve(process.cwd(), 'src/internals'),
    }),
  });

  return storybookBaseConfig;
};
