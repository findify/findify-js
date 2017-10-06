import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

export default (env, { module, plugins, output, ...config }) => ({
  ...config,
  entry: {
    styleProcessor: path.resolve(process.cwd(), 'src/styleProcessor.ts'),
  },

  target: 'web',

  node: {
    fs: 'empty',
  },

  output: {
    ...output,
    library: 'findifyCssBuilder',
    path: path.resolve(process.cwd(), 'lib'),
  },

  module: {
    ...module,
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['lodash', 'syntax-dynamic-import'],
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['last 2 versions', 'ie > 8'],
                    },
                  },
                ],
                'react-optimize',
                'stage-0',
                'react',
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...plugins,

    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),

    new UglifyJSPlugin({
      sourceMap: false,
      minimize: true,
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true,
      },
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
