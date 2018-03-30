const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')


interface WebpackEnvArgs {
  analyze?: boolean;
  generateStatsFile?: boolean;
}

const componentsPath = path.resolve(__dirname, '../react-components');

export default (env: WebpackEnvArgs, { mode }) => {
  const config: webpack.Configuration = {
    entry: {
      'bundle': path.resolve(__dirname, 'src/index'),
      'polyfill': path.resolve(__dirname, 'src/polyfill'),
    },
    devtool: 'source-map',
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 3000,
      stats: 'minimal',
      historyApiFallback: true,
      hot: true
    },
    stats: 'minimal',
    bail: true,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css'],
      alias: {
        debug: path.resolve(__dirname, '../../node_modules/debug'),
        immutable: path.resolve(__dirname, '../../node_modules/immutable')
      }
    },
    module: {
      noParse: /\.min\.js/,
      rules: [
        {
          test: /\.css$/,
          include: [
            path.resolve(componentsPath, 'src')
          ],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                getLocalIdent: require(
                  path.resolve(componentsPath, 'scripts/getLocalIdent')
                )
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(componentsPath, 'postcss.config.js')
                }
              }
            }
          ]
        },
        {
          test: /\.ts$/,
          include: [
            path.resolve(__dirname, 'src'),
          ],
          use: ['babel-loader']
        },
        {
          test: /\.tsx?$/,
          include: [
            path.resolve(componentsPath, 'src'),
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                extends: path.resolve(componentsPath, '.babelrc')
              }
            }
          ]
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __root: 'window.findify',
        __COMMITHASH__: JSON.stringify(new GitRevisionPlugin().commithash()),
        'process.env': {
          BROWSER: true
        },
        __DEBUG__: mode === 'development'
          ? 'base => props => { console.log(props); return base(props) }'
          : ''
      }),

      new DuplicatePackageCheckerPlugin(),

      new HtmlWebpackPlugin({
        hash: true,
        template:  path.resolve(__dirname, 'index.html'),
        inject: 'head'
      }),

      // new webpack.HashedModuleIdsPlugin()
    ],

  };

  if (Boolean(env && env.analyze)) {
    const analyzerPlugin = new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      openAnalyzer: true,
      generateStatsFile: Boolean(env.generateStatsFile),
      reportFilename: 'stats/webpack.stats.html',
      statsFilename: 'stats/webpack.stats.json',
    });
    config.plugins!.push(analyzerPlugin);
  }

  if (mode === 'development') {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.join(__dirname, 'node_modules/dll/vendor-manifest.json'))
    }));
    config.plugins.push(new AddAssetHtmlPlugin({
      filepath: require.resolve(path.join(__dirname, 'node_modules/dll/vendor.dll.js'))
    }));

  }

  return config;
};
