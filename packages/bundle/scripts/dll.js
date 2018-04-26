const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
const WebpackHashPlugin = require('./webpackHashPlugin');
const ignore = [
  "@findify/react-components"
];

const include = [
  // "@findify",
]

module.exports = (env = {}) => ({
  entry: {
    vendor: [...include, ...Object.keys(pkg.dependencies).filter(key => !ignore.includes(key))]
  },

  target: "web",

  node: {
    fs: 'empty'
  },

  devtool: 'source-map',

  output: {
    path: path.join(process.cwd(), 'node_modules/dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },

  plugins: [
    new WebpackHashPlugin(),

    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'CONFIG': JSON.stringify('staging'),
        'FINDIFY_ENV': JSON.stringify(env.staging ? 'staging' : 'production'),
      }
    }),
    new webpack.DllPlugin({
      path: path.join(process.cwd(), 'node_modules/dll', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
});
