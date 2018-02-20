import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

import pkg from '../package.json';

export default (env, { module, plugins, ...config }) => ({
  ...config,
  entry: [
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
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        ...module.rules.ts,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              "plugins": [
                "react-hot-loader/babel",
                ["lodash", { "id": ["lodash", "recompose"] }],
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-react-constant-elements",
                "@babel/plugin-syntax-object-rest-spread"
              ],
              "presets": [
                "@babel/preset-typescript",
                "@babel/preset-react",
                ["@babel/preset-env", {
                  "modules": false,
                  "targets": { "browsers": ["last 2 versions", "ie > 8"] }
                }]
              ]
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
      inject: 'head',
      template: path.resolve(process.cwd(), 'dev/templates/index.html'),
    }),
  ],
});
