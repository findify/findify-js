import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default (env, { module, plugins, output, ...config }) => ({
  ...config,
  entry: {
    components: path.resolve(process.cwd(), 'src/components.ts'),
  },

  output: {
    ...output,
    path: path.resolve(process.cwd(), 'lib'),
    libraryTarget: 'umd',
  },

  externals: nodeExternals(),

  module: {
    ...module,
    rules: [
      {
        ...module.rules.ts,
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
    // new Stats('stats.json')
  ],
});
