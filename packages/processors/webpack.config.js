const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, {}) => ({
  entry: {
    styleProcessorV6: path.resolve(process.cwd(), 'styles.v6.js'),
  },

  target: 'web',

  node: {
    fs: 'empty',
  },

  output: {
    path: path.resolve(process.cwd(), 'lib'),
    library: 'styleProcessor',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['last 2 versions', 'ie > 8'],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
