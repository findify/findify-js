const path = require('path')
const { compact } = require('lodash');
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const WebpackHashPlugin = require('./scripts/webpackHashPlugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

interface WebpackEnvArgs {
  analyze?: boolean;
  generateStatsFile?: boolean;
  findify_env?: 'staging'
}

const componentsPath = path.resolve(__dirname, '../react-components');
const createGlobals = (isDevelopment) => [
  '__MERCHANT_CONFIG_URL__',
  '__MERCHANT_API_KEY__',
  '__MERCHANT_VERSION__',
  '__MERCHANT_CSS__',
  '__INCLUDE_POLYFILL__',
  '__ENVIRONMENT__',
  '__CONFIG__',
  '__DISABLE_SENTRY__',
].reduce((acc, name) =>
  ({ ...acc, [name]: isDevelopment ? 'false' : name }), {}
)

export default (env: WebpackEnvArgs, { mode }) => {
  const config = {
    entry: {
      'bundle': path.resolve(__dirname, 'src/index'),
      'polyfill': path.resolve(__dirname, 'src/polyfill'),
    },
    devtool: 'source-map',
    output: {
      jsonpFunction: 'findifyJsonp',
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: process.env.PUBLIC_PATH || '/',
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
        immutable: path.resolve(__dirname, '../../node_modules/immutable'),
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: [
            path.resolve(componentsPath, 'src')
          ],
          use: [
            ...(mode === 'development' ? ["style-loader"] : []),
            {
              loader: mode === 'development' ? 'css-loader' : 'css-loader/locals',
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
                envName: mode,
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
        ...createGlobals(mode === 'development'),
        __root: 'window.findify',
        __COMMITHASH__: JSON.stringify(new GitRevisionPlugin().commithash()),
        __PUBLIC_PATH__: JSON.stringify(process.env.PUBLIC_PATH),
        'process.env': {
          HOT: mode === 'development',
          BROWSER: true,
          NODE_ENV: JSON.stringify(mode),
          FINDIFY_ENV: JSON.stringify(process.env.FINDIFY_ENV || 'production')
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

      new WebpackHashPlugin()
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

  if (mode === 'production') {
    config.plugins.push(new MiniCssExtractPlugin({
      filename: "[name].css",
    }));
    config.plugins.push(new CompressionPlugin({
      exclude: /\.map/,
    }));
    config.plugins.push(new CopyWebpackPlugin([{
      from: path.resolve(__dirname,'../react-components/lib/raw.css'),
      to: 'raw.css',
    }]));
    config.plugins.push(new CopyWebpackPlugin([{
      from: path.resolve(__dirname,'../react-components/lib/styles.css'),
      to: 'styles.css',
    }]));
    config.plugins.push(new CopyWebpackPlugin([{
      from: path.resolve(__dirname,'../react-components/lib/tree.json'),
      to: 'tree.json',
    }]));
    config.plugins.push(new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          pure_funcs: ['console.log', 'console.info']
        }
      }
    }));
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
