'use strict';

var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

var env = process.env.NODE_ENV;
var config = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    library: 'FindifyAnalytics',
    libraryTarget: 'window',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        FINDIFY_ENV: JSON.stringify(process.env.FINDIFY_ENV),
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },

  stats: 'normal',
};

if (env === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  config.plugins.push(new CompressionPlugin());
}

module.exports = config;
