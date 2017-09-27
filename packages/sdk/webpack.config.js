'use strict';

var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var env = process.env.NODE_ENV;
var config = {
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  output: {
    library: 'FindifySDK',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.FINDIFY_ENV': JSON.stringify('production'),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());

  config.externals = [nodeExternals()];
}

module.exports = config;
