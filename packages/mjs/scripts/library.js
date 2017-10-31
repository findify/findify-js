import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';

export default (env, { module, plugins, output, ...config }) => ({
  ...config,
  entry: {
    main: path.resolve(process.cwd(), 'src/components.ts'),
  },

  output: {
    ...output,
    path: path.resolve(process.cwd(), 'lib'),
    libraryTarget: 'commonjs2',
  },

  target: 'node',
  externals: [
    nodeExternals({
      modulesFromFile: true,
    }),
  ],

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
              plugins: [
                'lodash',
                'syntax-dynamic-import',
                'transform-object-rest-spread',
                'babel-plugin-transform-class-properties',
                'transform-react-constant-elements',
                'transform-react-inline-elements',
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
  plugins: [
    // new Stats('stats.json')
  ],
});
