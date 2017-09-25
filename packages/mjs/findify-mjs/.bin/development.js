import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

import pkg from '../package.json';

export default (env, { module, plugins, ...config }) => ({
  ...config,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(process.cwd(), 'src/index.ts'),
    // path.resolve(process.cwd(), 'dev/components.tsx')
  ],

  module: {
    ...module,
    rules: [
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'svg-sprite-loader',
          },
        ],
      },
      {
        ...module.rules.ts,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                'lodash',
                'syntax-dynamic-import',
                'transform-object-rest-spread',
                'babel-plugin-transform-class-properties',
                'transform-react-constant-elements',
                'transform-react-remove-prop-types',
                'transform-react-pure-class-to-function',
              ],
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: { browsers: ['last 2 versions', 'ie > 8'] },
                  },
                ],
                'react',
              ],
            },
          },
        ],
      },
    ],
  },

  // vscode chrome debugger support just source-map and inline-source-map
  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: path.resolve(process.cwd(), 'dist'),
    port: 3000,
    stats: 'minimal',
    historyApiFallback: true,
  },

  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new DashboardPlugin(),
    new webpack.DllReferencePlugin({
      context: path.join(process.cwd()),
      manifest: require(path.join(
        process.cwd(),
        'node_modules/dll/vendor-manifest.json',
      )),
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve(
        path.join(process.cwd(), 'node_modules/dll/vendor.dll.js'),
      ),
    }),
    new HtmlWebpackPlugin({
      title: pkg.description,
      hash: true,
      inject: 'head',
      template: path.resolve(process.cwd(), 'dev/templates/index.html'),
    }),
  ],
});
