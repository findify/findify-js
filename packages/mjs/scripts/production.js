import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import Stats from 'stats-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SentryPlugin from 'webpack-sentry-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';

import pkg from '../package.json';

const entity = [
  path.resolve(process.cwd(), 'src/polyfill.ts'),
  path.resolve(process.cwd(), 'src/index.ts')
]

export default (env, { module, plugins, output, ...config }) => {
  return {
    ...config,

    entry: {
      'extended': entity,
      'extended.min': entity,
      'pure': path.resolve(process.cwd(), 'src/index.ts'),
      'pure.min': path.resolve(process.cwd(), 'src/index.ts'),
    },
    output: {
      ...output,
      library: 'findifyMJS',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      publicPath: env.publicPath || '/'
    },
  
    module: {
      ...module,
      rules: [
        {
          ...module.rules.ts,
          include: [
            path.resolve(process.cwd(), 'src'),
            path.resolve(process.cwd(), 'dev'),
            path.resolve(process.cwd(), 'node_modules'),
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                plugins: [
                  ["lodash", { "id": ["lodash", "recompose", "ramda"] }],
                  "@babel/plugin-syntax-dynamic-import",
                  "@babel/plugin-proposal-object-rest-spread",
                  "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-transform-react-constant-elements",
                  "@babel/plugin-syntax-object-rest-spread"
                ],
                presets: [
                  "@babel/preset-typescript",
                  "@babel/preset-react",
                  ["@babel/preset-env", {
                    "modules": false,
                    "useBuiltIns": 'entry',
                    "targets": { "browsers": ["last 2 versions", "ie > 8"] },
                  }]
                ]
              }
            },
          ],
        },
      ],
    },

    stats: 'normal',

    devtool: 'hidden-source-map',

    plugins: [
      ...plugins,
      new DuplicatePackageCheckerPlugin(),
  
      new HtmlWebpackPlugin({
        title: pkg.description,
        inject: 'head',
        template: path.resolve(process.cwd(), 'dev/templates/index.html'),
      }),
  
      new UglifyJSPlugin({
        test: /\.min\.js($|\?)/i,
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
      }),
      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true,
      }),

      ...(Boolean(env && env.analyze)
        ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
            generateStatsFile: Boolean(env.generateStatsFile),
            reportFilename: 'stats/webpack.stats.html',
            statsFilename: 'stats/webpack.stats.json',
          })
        ]
        : []
      ),

      new CompressionPlugin(),
      ...(process.env.SENTRY_API_KEY
        ? [
            new SentryPlugin({
              organisation: 'findify',
              project: process.env.PROJECT_NAME,
              apiKey: process.env.SENTRY_API_KEY,
              release: function() {
                return process.env.GIT_SHA;
              },
            }),
          ]
        : []),
      // new Stats('stats.json')
    ],
  };
};
