const path = require('path');
const webpack = require('webpack');
const defaultConfig = require('../../config/webpack');

interface WebpackEnvArgs {
  analyze?: boolean;
  generateStatsFile?: boolean;
}

module.exports = (env: WebpackEnvArgs) => {
  const config = {
    context: path.resolve(process.cwd(), 'src'),

    entry: {
      'findify-analytics': './index',
      'findify-analytics.min': './index',
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      // we target a UMD and name it FindifySDK
      // when including the bundle in the browser
      // it will be accessible at `window.FindifySDK`
      libraryTarget: 'umd',
      library: 'FindifyAnalytics',
      libraryExport: 'default',
      // will name the AMD module of the UMD build,
      // otherwise an anonymous define is used
      umdNamedDefine: true,
    },

    devtool: 'source-map',
    stats: 'minimal',
    bail: true,
    resolve: {
      extensions: ['.ts', '.js'],
    },
    target: ['web', 'es5'],
    optimization: defaultConfig.optimization,
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                rootMode: 'upward',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          BROWSER: true,
        },
      }),
    ],
  };

  if (env && env.analyze) {
    config.plugins!.push(defaultConfig.BundleAnalyzer);
  }

  return config;
};
