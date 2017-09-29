import webpack from 'webpack';
import path from 'path';
import DashboardPlugin from 'webpack-dashboard/plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import pkg from '../package.json';

export default (env, { module, plugins, ...config }) => ({
  ...config,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(process.cwd(), 'dev/index.tsx'),
  ],

  module: {
    ...module,
    rules: [
      module.rules.font,
      module.rules.image,
      module.rules.localCSS,
      module.rules.globalCSS,
      module.rules.customCSS,
      module.rules.svg,
      {
        ...module.rules.ts,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
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
        'node_modules/dll/vendor-manifest.json'
      )),
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve(
        path.join(process.cwd(), 'node_modules/dll/vendor.dll.js')
      ),
    }),
    new HtmlWebpackPlugin({
      title: pkg.description,
      hash: true,
      inject: 'body',
      template: path.resolve(process.cwd(), 'dev/templates/index.html'),
    }),
  ],
});
