var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require('path');

var env = process.env.NODE_ENV;

var config = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        options: {
          silent: true,
          configFile: path.resolve(__dirname, 'tsconfig.lib.json'),
          compilerOptions: { target: 'es5' },
        },
      },
    ],
  },
  stats: 'normal',

  output: {
    library: 'FindifyHelpers',
    libraryTarget: 'umd',
  },
  plugins: [
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
