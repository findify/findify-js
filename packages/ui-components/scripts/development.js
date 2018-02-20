import webpack from 'webpack';
import path from 'path';
import DashboardPlugin from 'webpack-dashboard/plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var nodeExternals = require('webpack-node-externals');

const extractGlobal = new ExtractTextPlugin('styles.css');
const extractCustom = new ExtractTextPlugin('custom.css');

import pkg from '../package.json';

export default (env, { module, plugins, output, ...config }) => ({
  ...config,

  entry: {
    'findify-ui-components': path.resolve(process.cwd(), 'src/index.ts'),
  },
  output: {
    ...output,
    library: 'FindifyUIComponents',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  externals: [nodeExternals()],

  module: {
    ...module,
    rules: [
      module.rules.font,
      module.rules.image,
      {
        ...module.rules.localCSS,
        use: extractGlobal.extract({
          fallback: 'style-loader',
          use: module.rules.localCSS.use.filter((_, i) => !!i),
        }),
      },
      {
        ...module.rules.globalCSS,
        use: extractGlobal.extract({
          fallback: 'style-loader',
          use: module.rules.globalCSS.use.filter((_, i) => !!i),
        }),
      },
      module.rules.customCSS,
      module.rules.svg,
      {
        ...module.rules.ts,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                ["lodash", { "id": ["lodash", "recompose"] }],
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-object-rest-spread"
              ],
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
              ]
            }
          },
        ]
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
    extractGlobal,
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new DashboardPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: path.join(process.cwd()),
    //   manifest: require(path.join(
    //     process.cwd(),
    //     'node_modules/dll/vendor-manifest.json'
    //   )),
    // }),
    // new AddAssetHtmlPlugin({
    //   filepath: require.resolve(
    //     path.join(process.cwd(), 'node_modules/dll/vendor.dll.js')
    //   ),
    // }),
    // new HtmlWebpackPlugin({
    //   title: pkg.description,
    //   hash: true,
    //   inject: 'body',
    //   template: path.resolve(process.cwd(), 'dev/templates/index.html'),
    // }),
  ],
});
