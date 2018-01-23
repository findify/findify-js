import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import Stats from 'stats-webpack-plugin';
import SentryPlugin from 'webpack-sentry-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import pkg from '../package.json';

export default (env, { module, plugins, output, ...config }) => {
  return {
    ...config,
    entry: {
      extended: [
        path.resolve(process.cwd(), 'src/polyfill.ts'),
        path.resolve(process.cwd(), 'src/index.ts'),
      ],
      pure: path.resolve(process.cwd(), 'src/index.ts'),
    },

    output: {
      ...output,
      library: 'findifyMJS',
      libraryTarget: 'window',
      publicPath: env.publicPath || '/',
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

    stats: 'normal',

    devtool: 'hidden-source-map',

    plugins: [
      ...plugins,
      new HtmlWebpackPlugin({
        title: pkg.description,
        inject: 'head',
        template: path.resolve(process.cwd(), 'dev/templates/index.html'),
      }),
      new UglifyJSPlugin({
        test: /\.js($|\?)/i,
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
