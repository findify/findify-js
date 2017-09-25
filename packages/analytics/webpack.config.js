'use strict';

var webpack = require('webpack');

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
};

if (env === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
