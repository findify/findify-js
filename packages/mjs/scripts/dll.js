import path from 'path';
import webpack from 'webpack';
import pkg from '../package.json';

const ignore = [
  'postcss-calc',
  'postcss-color-function',
  'postcss-custom-properties',
  'postcss-font-magician',
  'postcss-nested',
  'autoprefixer',
  '@findify/ui-components',
  '@findify/analytics',
  '@types/ramda',
];

export default () => ({
  entry: {
    vendor: Object.keys(pkg.dependencies).filter(key => !ignore.includes(key)),
  },

  node: {
    fs: 'empty',
  },

  devtool: 'source-map',

  output: {
    path: path.join(process.cwd(), 'node_modules/dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(
        process.cwd(),
        'node_modules/dll',
        '[name]-manifest.json'
      ),
      name: '[name]_[hash]',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
