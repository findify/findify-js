const path = require('path');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackHashPlugin = require('./scripts/webpackHashPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const DeadCodePlugin = require('webpack-deadcode-plugin');

require('dotenv').config();

console.log('PUBLIC_PATH:', process.env.PUBLIC_PATH);
console.log('FINDIFY_ENV:', process.env.FINDIFY_ENV);

interface WebpackEnvArgs {
  analyze?: boolean;
  generateStatsFile?: boolean;
  findify_env?: 'staging';
  origin?: 'prod' | 'local' | 'test';
}

const componentsPath = path.resolve(__dirname, '../react-components');

const createGlobals = (isDevelopment, isLocal) =>
  [
    '__MERCHANT_CONFIG_URL__',
    '__MERCHANT_API_KEY__',
    '__MERCHANT_VERSION__',
    '__MERCHANT_CSS__',
    '__INCLUDE_POLYFILL__',
    '__ENVIRONMENT__',
    '__CONFIG__',
    '__DISABLE_SENTRY__',
    '__MERCHANT_ID__',
    '__SENTRY_ENABLED__',
  ].reduce(
    (acc, name) => ({
      ...acc,
      [name]: isDevelopment
        ? 'false'
        : isLocal
        ? (process.env[name] && JSON.stringify(process.env[name])) || name
        : name,
    }),
    {}
  );

module.exports = (env: WebpackEnvArgs, { mode }) => {
  const origin = env.origin || 'prod';

  const config = {
    entry: {
      bundle: path.resolve(__dirname, 'src/index'),
      polyfill: path.resolve(__dirname, 'src/polyfill'),
    },
    devtool: 'source-map',
    target: mode === 'development' ? 'web' : ['web', 'es5'],
    output: {
      chunkLoadingGlobal: 'findifyJsonp',
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: process.env.PUBLIC_PATH || '/',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 3000,
      stats: 'minimal',
      historyApiFallback: true,
      disableHostCheck: true,
      hot: true,
    },
    optimization: {
      mergeDuplicateChunks: true,
      usedExports: true,
      mangleExports: false,
      concatenateModules: false,
      splitChunks: {
        minChunks: 1,
        maxAsyncRequests: 1,
      },
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          parallel: true,
        }),
      ],
    },
    stats: 'minimal',
    bail: true,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css'],
      alias: {
        'react-dom':
          mode === 'development' ? '@hot-loader/react-dom' : 'react-dom',

        'react-is': path.resolve(__dirname, '../../node_modules/react-is'),
      },
    },
    module: {
      rules: [
        {
          parser: { amd: false },
        },
        {
          test: /\.css$/,
          include: [path.resolve(componentsPath, 'src')],
          use: [
            ...(mode === 'development' ? ['style-loader'] : []),
            {
              loader:
                mode === 'development' ? 'css-loader' : 'css-loader/locals',
              options: {
                modules: true,
                camelCase: true,
                getLocalIdent: require(path.resolve(
                  componentsPath,
                  'scripts/getLocalIdent'
                )),
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(componentsPath, 'postcss.config.js'),
                },
              },
            },
          ],
        },
        {
          test: /\.(j|t)sx?$/,
          exclude: [/@babel(?:\/|\\{1,2})runtime|core-js/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                rootMode: 'upward',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        ...createGlobals(mode === 'development', origin === 'local'),
        __root: 'window.findify',
        __COMMITHASH__: JSON.stringify(new GitRevisionPlugin().commithash()),
        __PUBLIC_PATH__: JSON.stringify(process.env.PUBLIC_PATH),
        'process.env': {
          HOT: mode === 'development',
          BROWSER: true,
          NODE_ENV: JSON.stringify(mode),
          IS_TEST: origin === 'test',
          FINDIFY_ENV: JSON.stringify(process.env.FINDIFY_ENV || 'production'),
        },
        __DEBUG__:
          mode === 'development'
            ? 'base => props => { console.log(props); return base(props) }'
            : '',
      }),

      new DuplicatePackageCheckerPlugin(),

      new HtmlWebpackPlugin({
        hash: true,
        template: path.resolve(__dirname, 'index.html'),
        inject: false,
      }),
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
    config.plugins.push(
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      new CompressionPlugin({ exclude: /\.map/ }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../react-components/lib/raw.css'),
            to: 'raw.css',
          },
          {
            from: path.resolve(__dirname, '../react-components/lib/styles.css'),
            to: 'styles.css',
          },
          {
            from: path.resolve(__dirname, '../react-components/lib/tree.json'),
            to: 'tree.json',
          },
        ],
      }),
      new WebpackManifestPlugin({
        filter: (f) => f.path.split('.').pop() === 'js',
      }),
      new DeadCodePlugin({
        patterns: ['src/**/*.(js|jsx|css)'],
        exclude: ['**/*.(stories|spec).(js|jsx)'],
      }),
      new WebpackHashPlugin({
        mapping: {
          'immutable/dist/immutable.es': 'immutable',
          '@hot-loader/react-dom': 'react-dom',
          'recompose/dist/Recompose.esm': 'recompose',
          'swiper/js/swiper.esm.js': 'swiper/js/swiper.esm',
          'react-id-swiper/lib/ReactIdSwiper.custom':
            'react-id-swiper/lib/ReactIdSwiper',
        },
        ignoreModulesCache: ['Jmof'],
      })
    );
  }

  if (mode === 'development') {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};
